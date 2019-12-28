package cathedral

import (
	"context"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	serviceCommon "github.com/vsjcloud/beaver/cathedral/common/service"
	rpcPhoto "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/photo"
	rpcProject "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
)

func registerGRPCServers(server *grpc.Server, modules *ModuleSet) {
	rpcProject.RegisterProjectServiceServer(server, modules.ProjectService)
	rpcPhoto.RegisterPhotoServiceServer(server, modules.PhotoService)
}

func unaryServerInterceptor(modules *ModuleSet) grpc.UnaryServerInterceptor {
	logger := modules.Logger
	auth := modules.Auth
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
		defer func() {
			if err := recover(); err != nil {
				logger.Error("panic recovered", zap.Any("error", err), zap.Any("context", ctx), zap.String("method",
					info.FullMethod))
			}
		}()
		if !serviceCommon.GRPCAuthorized(auth, ctx) {
			return nil, serviceCommon.GRPCErrUnauthorized
		}
		resp, err = handler(ctx, req)
		if err != nil {
			logger.Error("error while serving method", zap.String("method", info.FullMethod), zap.Error(err))
			return resp, status.Error(codes.Internal, "internal error")
		}
		return
	}
}

func grpcHandler(modules *ModuleSet) http.Handler {
	server := grpc.NewServer(
		grpc.ConnectionTimeout(modules.Config.Service.Timeout.Duration),
		grpc.UnaryInterceptor(unaryServerInterceptor(modules)),
	)
	registerGRPCServers(server, modules)
	return grpcweb.WrapServer(
		server,
		grpcweb.WithAllowNonRootResource(true),
		grpcweb.WithOriginFunc(func(origin string) bool {
			for _, allowedOrigin := range modules.Config.CORS.AllowedOrigins {
				if origin == allowedOrigin {
					return true
				}
			}
			return false
		}),
	)
}
