package project

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/common/id"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/common"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
)

type Service struct {
	config *config.Service
	modelStore store.Store
}

func NewService(config *config.Service, modelStore store.Store) (*Service, error) {
	service := &Service{
		config: config,
		modelStore: modelStore,
	}
	if err := service.initialService(); err != nil {
		return nil, err
	}
	return service, nil
}

func (s *Service) initialService() error {
	ctx, cancel := context.WithTimeout(context.Background(), s.config.Timeout.Duration)
	defer cancel()
	archivedProjects := &model.ArchivedProjectDirectory{
		ProjectIDs: make(map[string]bool),
	}
	if _, err := s.modelStore.PutIfNotExists(ctx, id.ArchivedProjectDirectoryID, archivedProjects); err != nil {
		return err
	}
	archivedTags := &model.ArchivedProjectTagDirectory{
		ProjectTagIDs: make(map[string]bool),
	}
	if _, err := s.modelStore.PutIfNotExists(ctx, id.ArchivedProjectTagDirectoryID, archivedTags); err != nil {
		return err
	}
	return nil
}

func (s *Service) CreateProject(
	ctx context.Context,
	_ *empty.Empty,
) (*project.CreateProjectResponse, error) {
	projectID := id.GenerateProjectID()
	if err := s.modelStore.Put(ctx, projectID, &model.Project{}); err != nil {
		return nil, err
	}
	return &project.CreateProjectResponse{
		ProjectID: projectID.String(),
	}, nil
}

func (s *Service) GetProjectTags(
	ctx context.Context,
	_ *empty.Empty,
) (*project.GetProjectTagsResponse, error) {
	raws, err := s.modelStore.BulkGetPartition(ctx, id.ProjectTagPartition)
	if err != nil {
		return nil, err
	}
	tags := make(map[string]*model.ProjectTag)
	for tagID, raw := range raws {
		tagModel := &model.ProjectTag{}
		if err := raw.Decode(tagModel); err != nil {
			return nil, err
		}
		tags[tagID.String()] = tagModel
	}
	return &project.GetProjectTagsResponse{
		Tags: tags,
	}, nil
}

func (s *Service) CreateProjectTag(
	ctx context.Context,
	request *project.CreateProjectTagRequest,
) (*project.CreateProjectTagResponse, error) {
	tagID := id.GenerateProjectTagID()
	if err := s.modelStore.Put(ctx, tagID, request.ProjectTag); err != nil {
		return nil, err
	}
	return &project.CreateProjectTagResponse{
		ProjectTagID: tagID.String(),
	}, nil
}

func (s *Service) UpdateProjectTag(
	ctx context.Context,
	request *project.UpdateProjectTagRequest,
) (*common.GeneralServiceResponse, error) {
	if err := s.modelStore.Put(ctx, id.ParseID(request.ProjectTagID), request.ProjectTag); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "update project tag successfully",
	}, nil
}

func (s *Service) GetArchivedProjectTagDirectory(
	ctx context.Context,
	_ *empty.Empty,
) (*project.GetArchivedProjectTagDirectoryResponse, error) {
	raw, err := s.modelStore.Get(ctx, id.ArchivedProjectTagDirectoryID)
	if err != nil {
		return nil, err
	}
	archivedTags := &model.ArchivedProjectTagDirectory{}
	if err := raw.Decode(archivedTags); err != nil {
		return nil, err
	}
	return &project.GetArchivedProjectTagDirectoryResponse{
		ArchivedProjectTagDirectory: archivedTags,
	}, nil
}

func (s *Service) ArchiveProjectTag(
	ctx context.Context,
	request *project.ArchiveProjectTagRequest,
) (*common.GeneralServiceResponse, error) {
	response, err := s.GetArchivedProjectTagDirectory(ctx, &empty.Empty{})
	if err != nil {
		return nil, err
	}
	archivedTags := response.ArchivedProjectTagDirectory
	archivedTags.ProjectTagIDs[request.ProjectTagID] = true
	if err := s.modelStore.Put(ctx, id.ArchivedProjectTagDirectoryID, archivedTags); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "archive project tag successfully",
	}, nil
}

func (s *Service) RecoverProjectTag(
	ctx context.Context,
	request *project.RecoverProjectTagRequest,
) (*common.GeneralServiceResponse, error) {
	response, err := s.GetArchivedProjectTagDirectory(ctx, &empty.Empty{})
	if err != nil {
		return nil, err
	}
	archivedTags := response.ArchivedProjectTagDirectory
	delete(archivedTags.ProjectTagIDs, request.ProjectTagID)
	if err := s.modelStore.Put(ctx, id.ArchivedProjectTagDirectoryID, archivedTags); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "recover project tag successfully",
	}, nil
}

func (s *Service) GetProjectWithSwap(
	ctx context.Context,
	request *project.GetProjectWithSwapRequest,
) (*project.GetProjectWithSwapResponse, error) {
	projectID := id.ParseID(request.ProjectID)
	raw, err := s.modelStore.Get(ctx, projectID)
	if err != nil {
		return nil, err
	}
	projectModel := &model.Project{}
	if err = raw.Decode(projectModel); err != nil {
		return nil, err
	}
	swapModel := &model.Project{}
	raw, err = s.modelStore.Get(ctx, id.ProjectSwapID(projectID))
	if err != nil {
		if err == store.ErrNoSuchItem {
			swapModel = nil
		} else {
			return nil, err
		}
	} else {
		if err = raw.Decode(swapModel); err != nil {
			return nil, err
		}
	}
	return &project.GetProjectWithSwapResponse{
		Project: projectModel,
		Swap:    swapModel,
	}, nil
}

func (s *Service) GetProjectsWithSwap(
	ctx context.Context,
	_ *empty.Empty,
) (*project.GetProjectsWithSwapResponse, error) {
	raws, err := s.modelStore.BulkGetPartition(ctx, id.ProjectPartition)
	if err != nil {
		return nil, err
	}
	projects := make(map[string]*model.Project)
	for projectID, raw := range raws {
		projectModel := &model.Project{}
		if err = raw.Decode(projectModel); err != nil {
			return nil, err
		}
		projects[projectID.String()] = projectModel
	}
	swaps := make(map[string]*model.Project)
	for projectID := range raws {
		swapID := id.ProjectSwapID(projectID)
		swapRaw, err := s.modelStore.Get(ctx, swapID)
		if err == nil {
			projectModel := &model.Project{}
			if decodeErr := swapRaw.Decode(projectModel); decodeErr != nil {
				return nil, err
			}
			swaps[swapID.String()] = projectModel
		} else if err != store.ErrNoSuchItem {
			return nil, err
		}
	}
	return &project.GetProjectsWithSwapResponse{
		Projects: projects,
		Swaps:    swaps,
	}, nil
}

func (s *Service) UpdateProjectSwap(
	ctx context.Context,
	request *project.UpdateProjectSwapRequest,
) (*common.GeneralServiceResponse, error) {
	swapID := id.ParseID(request.SwapID)
	if err := s.modelStore.Put(ctx, swapID, request.Swap); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "project swap is updated successfully",
	}, nil
}

func (s *Service) DeleteProjectSwap(
	ctx context.Context,
	request *project.DeleteProjectSwapRequest,
) (*common.GeneralServiceResponse, error) {
	if err := s.modelStore.Delete(ctx, id.ParseID(request.SwapID)); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "project swap is deleted successfully",
	}, nil
}

func (s *Service) UpdateProjectAndRemoveSwap(
	ctx context.Context,
	request *project.UpdateProjectAndRemoveSwapRequest,
) (*common.GeneralServiceResponse, error) {
	projectID := id.ParseID(request.ProjectID)
	if err := s.modelStore.Put(ctx, projectID, request.Project); err != nil {
		return nil, err
	}
	if err := s.modelStore.Delete(ctx, id.ProjectSwapID(projectID)); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "update original project and remove swap successfully",
	}, nil
}

func (s *Service) GetArchivedProjectDirectory(
	ctx context.Context,
	_ *empty.Empty,
) (*project.GetArchivedProjectDirectoryResponse, error) {
	raw, err := s.modelStore.Get(ctx, id.ArchivedProjectDirectoryID)
	if err != nil {
		return nil, err
	}
	archivedProjects := &model.ArchivedProjectDirectory{}
	if err := raw.Decode(archivedProjects); err != nil {
		return nil, err
	}
	return &project.GetArchivedProjectDirectoryResponse{
		ArchivedProjectDirectory: archivedProjects,
	}, nil
}

func (s *Service) ArchiveProject(
	ctx context.Context,
	request *project.ArchiveProjectRequest,
) (*common.GeneralServiceResponse, error) {
	response, err := s.GetArchivedProjectDirectory(ctx, &empty.Empty{})
	if err != nil {
		return nil, err
	}
	archivedProjects := response.ArchivedProjectDirectory
	if archivedProjects.ProjectIDs == nil {
		archivedProjects.ProjectIDs = make(map[string]bool)
	}
	archivedProjects.ProjectIDs[request.ProjectID] = true
	if err := s.modelStore.Put(ctx, id.ArchivedProjectDirectoryID, archivedProjects); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "archive project successfully",
	}, nil
}

func (s *Service) RecoverProject(
	ctx context.Context,
	request *project.RecoverProjectRequest,
) (*common.GeneralServiceResponse, error) {
	response, err := s.GetArchivedProjectDirectory(ctx, &empty.Empty{})
	if err != nil {
		return nil, err
	}
	archivedProjects := response.ArchivedProjectDirectory
	if archivedProjects.ProjectIDs == nil {
		archivedProjects.ProjectIDs = make(map[string]bool)
	}
	delete(archivedProjects.ProjectIDs, request.ProjectID)
	if err := s.modelStore.Put(ctx, id.ArchivedProjectDirectoryID, archivedProjects); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "recover project successfully",
	}, nil
}
