package cathedral

import (
	"context"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	serviceCommon "github.com/vsjcloud/beaver/cathedral/common/service"
	rpcPhoto "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/photo"
	rpcProject "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	rpcSagrada "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/sagrada"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
	"strings"
)

// TODO: HACK HACK should be done in another way
var (
	publicEndpointPrefixes = []string{"/sagrada.SagradaService"}
)

func registerGRPCServers(server *grpc.Server, modules *ModuleSet) {
	rpcProject.RegisterProjectServiceServer(server, modules.ProjectService)
	rpcPhoto.RegisterPhotoServiceServer(server, modules.PhotoService)
	rpcSagrada.RegisterSagradaServiceServer(server, modules.SagradaService)
}

func isPublicEndpoint(info *grpc.UnaryServerInfo) bool {
	for _, prefix := range publicEndpointPrefixes {
		if strings.HasPrefix(info.FullMethod, prefix) {
			return true
		}
	}
	return false
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
		if !isPublicEndpoint(info) && !serviceCommon.GRPCAuthorized(auth, ctx) {
			return nil, serviceCommon.GRPCErrUnauthorized
		}
		resp, err = handler(ctx, req)
		if err != nil {
			if grpcErr, ok := status.FromError(err); ok {
				return nil, grpcErr.Err()
			}
			logger.Error("error while serving method", zap.String("method", info.FullMethod), zap.Error(err))
			return nil, status.Error(codes.Internal, "internal error")
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
