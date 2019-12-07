package cathedral

import (
	"github.com/google/wire"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	protoProject "github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"github.com/vsjcloud/beaver/cathedral/modules/project"
	"go.uber.org/zap"
)

type ModuleSet struct {
	Config *config.Cathedral
	Logger *zap.Logger

	// Services
	ProjectService protoProject.ProjectServiceServer
}

var configModules = wire.NewSet(
	wire.FieldsOf(
		new(*config.Cathedral),
		"Auth",
	),
)

var serviceModules = wire.NewSet(
	project.NewService,
)

var cathedralModules = wire.NewSet(
	wire.Struct(new(ModuleSet), "*"),
	configModules,
	serviceModules,
)
