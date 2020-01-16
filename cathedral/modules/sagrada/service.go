package sagrada

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/vsjcloud/beaver/cathedral/common/id"
	"github.com/vsjcloud/beaver/cathedral/common/service"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/sagrada"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
)

type Service struct {
	modelStore store.Store
}

func NewService(modelStore store.Store) *Service {
	return &Service{
		modelStore: modelStore,
	}
}

func (s *Service) collectProjectPhotoIDs(photoIDs map[id.ID]bool, project *model.Project) {
	if project.FeaturePhoto != nil {
		photoIDs[id.ParseID(project.FeaturePhoto.PhotoID)] = true
	}
	for _, photo := range project.AlbumPhotos {
		if photo != nil {
			photoIDs[id.ParseID(photo.PhotoID)] = true
		}
	}
}

func (s *Service) getPhotos(ctx context.Context, photoIDs map[id.ID]bool) (map[string]*model.Photo, error) {
	photoRaws, err := s.modelStore.BulkGet(ctx, photoIDs)
	if err != nil {
		return nil, err
	}
	photos := make(map[string]*model.Photo)
	for photoRawID, photoRaw := range photoRaws {
		photo := &model.Photo{}
		if err = photoRaw.Decode(photo); err != nil {
			return nil, err
		}
		photos[photoRawID.String()] = photo
	}
	return photos, nil
}

func (s *Service) getActiveTags(ctx context.Context) (map[string]*model.ProjectTag, error) {
	allTagIDs, err := s.modelStore.BulkGetPartitionIDs(ctx, id.ProjectTagPartition)
	if err != nil {
		return nil, err
	}
	archivedDirectoryRaw, err := s.modelStore.Get(ctx, id.ArchivedProjectTagDirectoryID)
	if err != nil {
		return nil, err
	}
	archivedDirectory := &model.ArchivedProjectTagDirectory{}
	if err = archivedDirectoryRaw.Decode(archivedDirectory); err != nil {
		return nil, err
	}
	if archivedDirectory.ProjectTagIDs == nil {
		archivedDirectory.ProjectTagIDs = make(map[string]bool)
	}
	activeTagIDs := make(map[id.ID]bool)
	for tagID := range allTagIDs {
		if !archivedDirectory.ProjectTagIDs[tagID.String()] {
			activeTagIDs[tagID] = true
		}
	}
	activeTagRaws, err := s.modelStore.BulkGet(ctx, activeTagIDs)
	if err != nil {
		return nil, err
	}
	activeTags := make(map[string]*model.ProjectTag)
	for tagID, raw := range activeTagRaws {
		tag := &model.ProjectTag{}
		if err = raw.Decode(tag); err != nil {
			return nil, err
		}
		activeTags[tagID.String()] = tag
	}
	return activeTags, nil
}

func (s *Service) GetProjectDirectoryPageProps(
	ctx context.Context,
	_ *empty.Empty,
) (*sagrada.GetProjectDirectoryPagePropsResponse, error) {
	projectIDs, err := s.modelStore.BulkGetPartitionIDs(ctx, id.ProjectPartition)
	if err != nil {
		return nil, err
	}
	archivedDirectoryRaw, err := s.modelStore.Get(ctx, id.ArchivedProjectDirectoryID)
	if err != nil {
		return nil, err
	}
	archivedDirectory := &model.ArchivedProjectDirectory{}
	if err = archivedDirectoryRaw.Decode(archivedDirectory); err != nil {
		return nil, err
	}
	for archivedID := range archivedDirectory.ProjectIDs {
		delete(projectIDs, id.ParseID(archivedID))
	}
	projectRaws, err := s.modelStore.BulkGet(ctx, projectIDs)
	if err != nil {
		return nil, err
	}
	projects := make(map[string]*model.Project)
	photoIDs := make(map[id.ID]bool)
	for rawID, raw := range projectRaws {
		project := &model.Project{}
		if err = raw.Decode(project); err != nil {
			return nil, err
		}
		// TODO: also HACK
		if project.Name != "" {
			projects[rawID.String()] = project
			s.collectProjectPhotoIDs(photoIDs, project)
		}
	}
	photos, err := s.getPhotos(ctx, photoIDs)
	if err != nil {
		return nil, err
	}
	tags, err := s.getActiveTags(ctx)
	if err != nil {
		return nil, err
	}
	return &sagrada.GetProjectDirectoryPagePropsResponse{
		Projects:    projects,
		Photos:      photos,
		ProjectTags: tags,
	}, nil
}

func (s *Service) GetProjectPageProps(
	ctx context.Context,
	request *sagrada.GetProjectPagePropsRequest,
) (*sagrada.GetProjectPagePropsResponse, error) {
	projectID := id.ParseID(request.ProjectID)
	if projectID.Partition != id.ProjectPartition {
		return nil, service.GRPCErrInvalidID
	}
	projectRaw, err := s.modelStore.Get(ctx, projectID)
	if err != nil {
		return nil, err
	}
	project := &model.Project{}
	if err = projectRaw.Decode(project); err != nil {
		return nil, err
	}
	photoIDs := make(map[id.ID]bool)
	s.collectProjectPhotoIDs(photoIDs, project)
	photos, err := s.getPhotos(ctx, photoIDs)
	if err != nil {
		return nil, err
	}
	tags, err := s.getActiveTags(ctx)
	if err != nil {
		return nil, err
	}
	return &sagrada.GetProjectPagePropsResponse{
		Project:     project,
		Photos:      photos,
		ProjectTags: tags,
	}, nil
}
