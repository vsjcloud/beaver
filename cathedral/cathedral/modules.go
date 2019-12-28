package cathedral

import (
	"github.com/google/wire"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/modules/photo"
	"github.com/vsjcloud/beaver/cathedral/modules/project"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/modules/store/modelstore"
	"go.uber.org/zap"
)

type ModuleSet struct {
	Config *config.Cathedral
	Logger *zap.Logger
	Auth   *auth.Auth

	// Store
	ModelStore store.Store

	// Services
	ProjectService *project.Service
	PhotoService   *photo.Service
}

var configModules = wire.NewSet(
	wire.FieldsOf(
		new(*config.Cathedral),
		"Auth",
		"Photo",
		"ModelStore",
		"Service",
	),
)

var serviceModules = wire.NewSet(
	project.NewService,
	photo.NewService,
)

var cathedralModules = wire.NewSet(
	wire.Struct(new(ModuleSet), "*"),
	configModules,
	auth.NewAuth,
	modelstore.NewModelStore,
	serviceModules,
)
