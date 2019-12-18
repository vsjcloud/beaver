package project

import (
	"context"
	"github.com/golang/protobuf/ptypes/empty"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	serviceCommon "github.com/vsjcloud/beaver/cathedral/common/service"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/common"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"github.com/vsjcloud/beaver/cathedral/id"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type service struct {
	auth       *auth.Auth
	modelStore store.Store
}

func NewService(auth *auth.Auth, modelStore store.Store) project.ProjectServiceServer {
	return &service{
		auth:       auth,
		modelStore: modelStore,
	}
}

func (s *service) CreateEmptyProjectWithSwap(
	ctx context.Context,
	_ *empty.Empty,
) (*project.CreateEmptyProjectWithSwapResponse, error) {
	swapID := id.GenerateProjectID()
	if err := s.modelStore.Put(ctx, id.StoreID(id.ProjectIDPrefix, swapID), &model.Project{}); err != nil {
		return nil, serviceCommon.GRPCErr(codes.Internal, err)
	}
	projectID := id.GenerateProjectID()
	err := s.modelStore.Put(ctx, id.StoreID(id.ProjectIDPrefix, projectID), &model.Project{SwapID: swapID})
	if err != nil {
		return nil, serviceCommon.GRPCErr(codes.Internal, err)
	}
	return &project.CreateEmptyProjectWithSwapResponse{
		ProjectID: projectID,
		SwapID:    swapID,
	}, nil
}

func (s *service) UpdateProject(
	ctx context.Context,
	request *project.UpdateProjectRequest,
) (*common.GeneralServiceResponse, error) {
	if !id.IsProjectID(request.ProjectID) {
		return nil, status.Error(codes.InvalidArgument, "invalid project id")
	}
	if request.Project == nil {
		return nil, status.Error(codes.InvalidArgument, "project is empty")
	}
	if err := s.modelStore.Put(ctx, id.StoreID(id.ProjectIDPrefix, request.ProjectID), request.Project); err != nil {
		return nil, serviceCommon.GRPCErr(codes.Internal, err)
	}
	return &common.GeneralServiceResponse{
		Message: "project is updated successfully",
	}, nil
}

func (s *service) UpdateOriginalProjectAndRemoveSwap(
	ctx context.Context,
	request *project.UpdateOriginalProjectAndRemoveSwapRequest,
) (*common.GeneralServiceResponse, error) {
	if !id.IsProjectID(request.SwapID) {
		return nil, status.Error(codes.InvalidArgument, "invalid swap id")
	}
	if !id.IsProjectID(request.ProjectID) {
		return nil, status.Error(codes.InvalidArgument, "invalid project id")
	}
	if request.Project == nil {
		return nil, status.Error(codes.InvalidArgument, "project is empty")
	}
	if err := s.modelStore.Put(ctx, id.StoreID(id.ProjectIDPrefix, request.ProjectID), request.Project); err != nil {
		return nil, serviceCommon.GRPCErr(codes.Internal, err)
	}
	if err := s.modelStore.Delete(ctx, id.StoreID(id.ProjectIDPrefix, request.SwapID)); err != nil {
		return nil, serviceCommon.GRPCErr(codes.Internal, err)
	}
	return &common.GeneralServiceResponse{
		Message: "update original project and remove swap successfully",
	}, nil
}

func (s *service) DeleteProject(
	ctx context.Context,
	request *project.DeleteProjectRequest,
) (*common.GeneralServiceResponse, error) {
	if !id.IsProjectID(request.ProjectID) {
		return nil, status.Error(codes.InvalidArgument, "invalid project id")
	}
	if err := s.modelStore.Delete(ctx, id.StoreID(id.ProjectIDPrefix, request.ProjectID)); err != nil {
		return nil, serviceCommon.GRPCErr(codes.Internal, err)
	}
	return &common.GeneralServiceResponse{
		Message: "delete project successfully",
	}, nil
}
