package photo

import (
	"bytes"
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/go-chi/chi"
	"github.com/golang/protobuf/proto"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/common/id"
	"github.com/vsjcloud/beaver/cathedral/common/service"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/photo"
	"github.com/vsjcloud/beaver/cathedral/modules/s3"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"go.uber.org/zap"
	"gopkg.in/h2non/bimg.v1"
	"io/ioutil"
	"net/http"
	"sort"
)

const (
	fullHDSize = 1920
	hdSize     = 1080
)

type Service struct {
	serviceConfig *config.Service
	photoConfig   *config.Photo
	logger        *zap.Logger
	auth          *auth.Auth
	modelStore    store.Store
	s3Service     *s3.Service
}

func NewService(
	serviceConfig *config.Service,
	photoConfig *config.Photo,
	logger *zap.Logger,
	auth *auth.Auth,
	modelStore store.Store,
) (*Service, error) {
	sess, err := session.NewSession(&aws.Config{
		Region: &photoConfig.AWSRegion,
		Credentials: credentials.NewStaticCredentials(
			photoConfig.AWSAccessKeyID,
			photoConfig.AWSSecretAccessKey,
			photoConfig.AWSSessionToken,
		),
	})
	if err != nil {
		return nil, err
	}
	return &Service{
		serviceConfig: serviceConfig,
		photoConfig:   photoConfig,
		logger:        logger,
		auth:          auth,
		modelStore:    modelStore,
		s3Service:     s3.NewService(sess, photoConfig.S3Bucket),
	}, nil
}

func (s *Service) RegisterRoutes(router chi.Router) {
	router.Post("/upload", s.uploadPhoto)
}

func (s *Service) createVariationsAndUpload(
	ctx context.Context,
	photoName string,
	buf []byte,
	variations []int,
) (id.ID, *model.Photo, error) {
	if len(variations) == 0 {
		variations = append(variations, hdSize)
	}
	sort.Ints(variations)

	bimgPhoto := bimg.NewImage(buf)
	photoSize, err := bimgPhoto.Size()
	if err != nil {
		return id.EmptyID, nil, err
	}

	photoID := id.GeneratePhotoID()
	photoModel := &model.Photo{
		Name:        photoName,
		Resolutions: make(map[string]*model.PhotoResolution),
	}

	for i := len(variations) - 1; i >= 0; i-- {
		if i < len(variations)-1 && photoSize.Height <= variations[i] && photoSize.Width <= variations[i] {
			break
		}
		l := float32(variations[i])
		w := float32(photoSize.Width)
		h := float32(photoSize.Height)
		if h > l {
			w = (l / h) * w
			h = l
		}
		if w > l {
			h = (l / w) * h
			w = l
		}
		resized, err := bimgPhoto.Resize(int(w), int(h))
		if err != nil {
			return id.EmptyID, nil, err
		}
		resolutionID := id.GeneratePhotoResolutionID(photoID)
		contentDisposition := fmt.Sprintf("inline; filename=\"%s\"", photoName)
		err = s.s3Service.PutObject(
			ctx,
			resolutionID.String(),
			bytes.NewReader(resized),
			s3.ACLPublicRead,
			contentDisposition,
		)
		if err != nil {
			return id.EmptyID, nil, err
		}
		photoModel.Resolutions[resolutionID.String()] = &model.PhotoResolution{
			Height: int32(h),
			Width:  int32(w),
			Size:   int64(len(resized)),
		}
	}

	if err := s.modelStore.Put(ctx, photoID, photoModel); err != nil {
		return id.EmptyID, nil, err
	}

	return photoID, photoModel, nil
}

func (s *Service) uploadPhoto(w http.ResponseWriter, r *http.Request) {
	if !service.HTTPAuthorized(s.auth, r) {
		service.HTTPErrUnauthorized(w)
		return
	}

	if err := r.ParseMultipartForm(s.photoConfig.MaxUploadSize); err != nil {
		http.Error(w, "cannot parse form", http.StatusBadRequest)
		return
	}

	formPhoto, handler, err := r.FormFile("photo")
	if err != nil {
		http.Error(w, "error while retrieving photo", http.StatusBadRequest)
		return
	}
	defer formPhoto.Close()

	if handler.Size > s.photoConfig.MaxUploadSize {
		http.Error(w, "size limit exceeded", http.StatusBadRequest)
		return
	}

	buf, err := ioutil.ReadAll(formPhoto)
	if err != nil {
		http.Error(w, "cannot read photo", http.StatusBadRequest)
		return
	}

	if !bimg.IsTypeSupported(bimg.DetermineImageType(buf)) {
		http.Error(w, "photo type is not supported", http.StatusBadRequest)
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), s.serviceConfig.Timeout.Duration)
	defer cancel()

	photoID, photoModel, err := s.createVariationsAndUpload(
		ctx,
		handler.Filename,
		buf,
		[]int{hdSize, fullHDSize},
	)
	if err != nil {
		s.logger.Error("cannot create photo variations and upload", zap.Error(err))
		service.HTTPErrServer(w)
		return
	}
	photoAndID := &model.PhotoAndID{
		PhotoID: photoID.String(),
		Photo: photoModel,
	}
	b, err := proto.Marshal(photoAndID)
	if err != nil {
		s.logger.Error("cannot marshal photoAndID", zap.Error(err))
		service.HTTPErrServer(w)
		return
	}
	if _, err = w.Write(b); err != nil {
		s.logger.Error("cannot write to client", zap.Error(err))
	}
}

// TODO: DANGER: can hijack to get any data
func (s *Service) GetPhoto(
	ctx context.Context,
	request *photo.GetPhotoRequest,
) (*photo.GetPhotoResponse, error) {
	raw, err := s.modelStore.Get(ctx, id.ParseID(request.PhotoID))
	if err != nil {
		return nil, err
	}
	photoModel := &model.Photo{}
	if err = raw.Decode(photoModel); err != nil {
		return nil, err
	}
	return &photo.GetPhotoResponse{
		Photo: photoModel,
	}, nil
}

// TODO: DANGER: can hijack to get any data
func (s *Service) BulkGetPhotos(
	ctx context.Context,
	request *photo.BulkGetPhotosRequest,
) (*photo.BulkGetPhotosResponse, error) {
	ids := make(map[id.ID]bool)
	for photoID := range request.PhotoIDs {
		ids[id.ParseID(photoID)] = true
	}
	raws, err := s.modelStore.BulkGet(ctx, ids)
	if err != nil {
		return nil, err
	}
	photoModels := make(map[string]*model.Photo)
	for photoID, raw := range raws {
		photoModel := &model.Photo{}
		if err = raw.Decode(photoModel); err != nil {
			return nil, err
		}
		photoModels[photoID.String()] = photoModel
	}
	return &photo.BulkGetPhotosResponse{
		Photos: photoModels,
	}, nil
}
