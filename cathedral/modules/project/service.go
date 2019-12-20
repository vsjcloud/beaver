package project

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/vsjcloud/beaver/cathedral/common/id"
	serviceCommon "github.com/vsjcloud/beaver/cathedral/common/service"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/common"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	err := s.modelStore.Put(ctx, id.ProjectSwapID(projectID), &model.Project{})
	if err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	return &project.CreateEmptyProjectWithSwapResponse{
		ProjectID: projectID.String(),
	}, nil
}

func (s *service) GetProject(
	ctx context.Context,
	request *project.GetProjectRequest,
) (*project.GetProjectResponse, error) {
	projectID := id.ParseID(request.ProjectID)
	if !id.IsProjectID(projectID) {
		return nil, status.Error(codes.InvalidArgument, "invalid project id")
	}
	raw, err := s.modelStore.Get(ctx, projectID)
	if err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	projectModel := &model.Project{}
	if err = raw.Decode(projectModel); err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	return &project.GetProjectResponse{
		Project: projectModel,
	}, nil
}

func (s *service) GetProjects(
	ctx context.Context,
	_ *empty.Empty,
) (*project.GetProjectsResponse, error) {
	raws, err := s.modelStore.BulkGetPartition(ctx, id.ProjectPartition)
	if err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	projects := make(map[string]*model.Project)
	for projectID, raw := range raws {
		projectModel := &model.Project{}
		if err = raw.Decode(projectModel); err != nil {
			return nil, serviceCommon.GRPCInternalErr(err)
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
	if !id.IsProjectID(projectID) {
		return nil, status.Error(codes.InvalidArgument, "invalid project id")
	}
	if request.Project == nil {
		return nil, status.Error(codes.InvalidArgument, "project is empty")
	}
	if err := s.modelStore.Put(ctx, projectID, request.Project); err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
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
	if !id.IsProjectID(projectID) {
		return nil, status.Error(codes.InvalidArgument, "invalid projectID id")
	}
	if request.Project == nil {
		return nil, status.Error(codes.InvalidArgument, "project is empty")
	}
	if err := s.modelStore.Put(ctx, projectID, request.Project); err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	if err := s.modelStore.Delete(ctx, id.ProjectSwapID(projectID)); err != nil {
		return nil, serviceCommon.GRPCInternalErr(err)
	}
	return &common.GeneralServiceResponse{
		Message: "update original project and remove swap successfully",
	}, nil
}
