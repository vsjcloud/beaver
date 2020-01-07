package cathedral

import (
	"fmt"
	"github.com/go-chi/chi"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"go.uber.org/zap"
	"log"
	"net/http"
)

type Cathedral struct {
	Modules *ModuleSet
}

func NewCathedral(config *config.Cathedral) (*Cathedral, error) {
	if config == nil {
		log.Panic("config is nil")
	}
	var logger *zap.Logger
	if config.Mode == "production" {
		logger = newProductionLogger()
	} else {
		logger = newDevelopmentLogger()
	}
	modules, err := initializeModuleSet(config, logger)
	if err != nil {
		return nil, err
	}
	return &Cathedral{Modules: modules}, nil
}

func (c *Cathedral) Serve() {
	if c.Modules == nil {
		log.Panic("Modules is nil")
	}
	router := chi.NewRouter()
	setupRouter(router, c.Modules)
	if c.Modules.Config.Mode == "production" {
		c.Modules.Logger.Info("serve Cathedral in production mode")
	} else {
		c.Modules.Logger.Info("serve Cathedral in development mode")
	}
	c.Modules.Logger.Info(fmt.Sprintf("HTTP base path %s", c.Modules.Config.HTTP.APIPath))
	c.Modules.Logger.Info(fmt.Sprintf("serving at address %s", c.Modules.Config.HTTP.Address))
	c.Modules.Logger.Panic("serving error", zap.Error(http.ListenAndServe(c.Modules.Config.HTTP.Address, router)))
}
