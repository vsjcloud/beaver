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
	modules *ModuleSet
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
	return &Cathedral{modules: modules}, nil
}

func (c *Cathedral) Serve() {
	if c.modules == nil {
		log.Panic("modules is nil")
	}
	router := chi.NewRouter()
	setupRouter(router, c.modules)
	if c.modules.Config.Mode == "production" {
		c.modules.Logger.Info("serve Cathedral in production mode")
	} else {
		c.modules.Logger.Info("serve Cathedral in development mode")
	}
	c.modules.Logger.Info(fmt.Sprintf("serving at address %s", c.modules.Config.HTTP.Address))
	c.modules.Logger.Panic("serving error", zap.Error(http.ListenAndServe(c.modules.Config.HTTP.Address, router)))
}
