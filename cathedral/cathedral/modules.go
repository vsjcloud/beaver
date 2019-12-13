package cathedral

import (
	"github.com/google/wire"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/rpc/project"
	"github.com/vsjcloud/beaver/cathedral/modules/photo"
	projectImpl "github.com/vsjcloud/beaver/cathedral/modules/project"
	"go.uber.org/zap"
)

type ModuleSet struct {
	Config *config.Cathedral
	Logger *zap.Logger
	Auth   *auth.Auth

	// Services
	ProjectService project.ProjectServiceServer
	PhotoService   *photo.Service
}

var configModules = wire.NewSet(
	wire.FieldsOf(
		new(*config.Cathedral),
		"Auth",
		"Photo",
	),
)

var serviceModules = wire.NewSet(
	projectImpl.NewService,
	photo.NewService,
)

var cathedralModules = wire.NewSet(
	wire.Struct(new(ModuleSet), "*"),
	configModules,
	auth.NewAuth,
	serviceModules,
)
