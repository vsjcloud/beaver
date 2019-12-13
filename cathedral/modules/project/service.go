package project

import (
	"context"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	serviceUtils "github.com/vsjcloud/beaver/cathedral/common/service"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/common"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"go.uber.org/zap"
)

type service struct {
	auth   *auth.Auth
	logger *zap.Logger
}

func NewService(auth *auth.Auth, logger *zap.Logger) project.ProjectServiceServer {
	return &service{
		auth:   auth,
		logger: logger,
	}
}

func (s *service) Create(ctx context.Context, req *project.CreateProjectRequest) (*common.GeneralServiceResponse, error) {
	if !serviceUtils.GRPCAuthorized(s.auth, ctx) {
		return nil, serviceUtils.GRPCErrUnauthorized
	}
	return &common.GeneralServiceResponse{
		Message: req.Project.Name,
	}, nil
}
