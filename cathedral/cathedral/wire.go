// +build wireinject

package cathedral

import (
	"github.com/google/wire"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"go.uber.org/zap"
)

func initializeModuleSet(cathedralConfig *config.Cathedral, logger *zap.Logger) (*ModuleSet, error) {
	wire.Build(cathedralModules)
	return &ModuleSet{}, nil
}
