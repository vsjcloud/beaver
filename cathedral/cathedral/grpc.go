package cathedral

import (
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	protoProject "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"google.golang.org/grpc"
	"net/http"
)

func registerGRPCServers(server *grpc.Server, modules *ModuleSet) {
	protoProject.RegisterProjectServiceServer(server, modules.ProjectService)
}

func grpcHandler(modules *ModuleSet) http.Handler {
	server := grpc.NewServer()
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
