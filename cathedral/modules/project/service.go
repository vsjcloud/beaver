package project

import (
	"context"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/common"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
)

type service struct {
}

func NewService() project.ProjectServiceServer {
	return &service{}
}

func (s *service) Create(ctx context.Context, req *project.CreateProjectRequest) (*common.GeneralServiceResponse, error) {
	return &common.GeneralServiceResponse{
		Message: req.Project.Name,
	}, nil
}
