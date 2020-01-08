package cathedral

import (
	"github.com/go-chi/chi"
	"github.com/vsjcloud/beaver/cathedral/common/middlewares"
)

func setupRouter(router chi.Router, modules *ModuleSet) {
	router.Use(middlewares.Recovery(modules.Logger))
	router.Route(modules.Config.HTTP.APIPath, func(apiRouter chi.Router) {
		setupAPIRouter(apiRouter, modules)
	})
}

func setupAPIRouter(router chi.Router, modules *ModuleSet) {
	router.Use(middlewares.Auth(modules.Config.Auth))
	router.Route("/grpc", func(grpcRouter chi.Router) {
		grpcRouter.Handle("/*", grpcHandler(modules))
	})
}
