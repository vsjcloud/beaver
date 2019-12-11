// Code generated by Wire. DO NOT EDIT.

//go:generate wire
//+build !wireinject

package cathedral

import (
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/modules/project"
	"go.uber.org/zap"
)

// Injectors from wire.go:

func initializeModuleSet(cathedralConfig *config.Cathedral, logger *zap.Logger) (*ModuleSet, error) {
	configAuth := cathedralConfig.Auth
	authAuth := auth.NewAuth(configAuth)
	projectServiceServer := project.NewService(authAuth, logger)
	moduleSet := &ModuleSet{
		Config:         cathedralConfig,
		Logger:         logger,
		Auth:           authAuth,
		ProjectService: projectServiceServer,
	}
	return moduleSet, nil
}