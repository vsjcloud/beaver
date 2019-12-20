package project

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/vsjcloud/beaver/cathedral/common/id"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/common"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
)

type service struct {
	modelStore store.Store
}

func NewService(modelStore store.Store) project.ProjectServiceServer {
	return &service{
		modelStore: modelStore,
	}
}

func (s *service) CreateEmptyProjectWithSwap(
	ctx context.Context,
	_ *empty.Empty,
) (*project.CreateEmptyProjectWithSwapResponse, error) {
	projectID := id.GenerateProjectID()
	if err := s.modelStore.Put(ctx, projectID, &model.Project{}); err != nil {
		return nil, err
	}
	err := s.modelStore.Put(ctx, id.ProjectSwapID(projectID), &model.Project{})
	if err != nil {
		return nil, err
	}
	return &project.CreateEmptyProjectWithSwapResponse{
		ProjectID: projectID.String(),
	}, nil
}

func (s *service) GetProjectWithSwap(
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

func (s *service) GetProjects(
	ctx context.Context,
	_ *empty.Empty,
) (*project.GetProjectsResponse, error) {
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
	return &project.GetProjectsResponse{
		Projects: projects,
	}, nil
}

func (s *service) UpdateProject(
	ctx context.Context,
	request *project.UpdateProjectRequest,
) (*common.GeneralServiceResponse, error) {
	projectID := id.ParseID(request.ProjectID)
	if err := s.modelStore.Put(ctx, projectID, request.Project); err != nil {
		return nil, err
	}
	return &common.GeneralServiceResponse{
		Message: "project is updated successfully",
	}, nil
}

func (s *service) UpdateOriginalProjectAndRemoveSwap(
	ctx context.Context,
	request *project.UpdateOriginalProjectAndRemoveSwapRequest,
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
