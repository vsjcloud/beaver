package photo

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/go-chi/chi"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/common/service"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/id"
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
	timeout := s.serviceConfig.Timeout.Duration
	router.Post("/upload", service.HTTPWithTimeout(timeout, s.uploadPhoto))
}

func (s *Service) createVariationsAndUpload(
	ctx context.Context,
	photoID string,
	photoName string,
	buf []byte,
	variations []int,
) (*model.Photo, error) {
	if len(variations) == 0 {
		variations = append(variations, hdSize)
	}
	sort.Ints(variations)

	photo := bimg.NewImage(buf)
	photoSize, err := photo.Size()
	if err != nil {
		return nil, err
	}

	photoModel := &model.Photo{
		Name:        photoName,
		Resolutions: make(map[string]*model.PhotoResolution),
	}

	for i := len(variations) - 1; i >= 0; i-- {
		if i < len(variations) - 1 && photoSize.Height <= variations[i] && photoSize.Width <= variations[i] {
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
		resized, err := photo.Resize(int(w), int(h))
		if err != nil {
			return nil, err
		}
		resolutionID := id.GeneratePhotoResolutionID(photoID)
		contentDisposition := fmt.Sprintf("attachment; filename=\"%s\"", photoName)
		err = s.s3Service.PutObject(
			ctx,
			resolutionID,
			bytes.NewReader(resized),
			s3.ACLPublicRead,
			contentDisposition,
		)
		if err != nil {
			return nil, err
		}
		photoModel.Resolutions[resolutionID] = &model.PhotoResolution{
			Height: int32(h),
			Width:  int32(w),
			Size:   int64(len(resized)),
		}
	}

	if err := s.modelStore.Put(ctx, id.StoreID(id.PhotoIDPrefix, photoID), photoModel); err != nil {
		return nil, err
	}

	return photoModel, nil
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

	photo, handler, err := r.FormFile("photo")
	if err != nil {
		http.Error(w, "error while retrieving photo", http.StatusBadRequest)
		return
	}
	defer photo.Close()

	if handler.Size > s.photoConfig.MaxUploadSize {
		http.Error(w, "size limit exceeded", http.StatusBadRequest)
		return
	}

	buf, err := ioutil.ReadAll(photo)
	if err != nil {
		http.Error(w, "cannot read photo", http.StatusBadRequest)
		return
	}

	if !bimg.IsTypeSupported(bimg.DetermineImageType(buf)) {
		http.Error(w, "photo type is not supported", http.StatusBadRequest)
		return
	}

	parentID, err := id.StringToStoreID(r.FormValue("parentID"))
	if err != nil {
		http.Error(w, "invalid parent id", http.StatusBadRequest)
		return
	}

	photoModel, err := s.createVariationsAndUpload(
		r.Context(),
		id.GeneratePhotoID(parentID.Partition + parentID.Sort),
		handler.Filename,
		buf,
		[]int{hdSize, fullHDSize},
	)
	if err != nil {
		s.logger.Error("cannot create photo variations and upload", zap.Error(err))
		service.HTTPErrServer(w)
		return
	}

	if err := json.NewEncoder(w).Encode(photoModel); err != nil {
		s.logger.Error("cannot send photo to client", zap.Error(err))
	}
}
