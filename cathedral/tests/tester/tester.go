package tester

import (
	"github.com/BurntSushi/toml"
	"github.com/vsjcloud/beaver/cathedral/cathedral"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"os"
	"path/filepath"
	"runtime"
	"testing"
)

var (
	rootPath      string
	resourcesPath string
	Modules       *cathedral.ModuleSet
	References    references
)

func resolvePaths() {
	_, file, _, ok := runtime.Caller(0)
	if !ok {
		panic("cannot resolve paths")
	}
	var err error
	rootPath, err = filepath.Abs(filepath.Join(filepath.Dir(file), "../"))
	if err != nil {
		panic(err)
	}
	resourcesPath = filepath.Join(rootPath, "resources/")
}

func loadModules() {
	cathedralConfig, err := config.LoadConfigFromFile(filepath.Join(resourcesPath, "cathedral.toml"))
	if err != nil {
		panic(err)
	}
	app, err := cathedral.NewCathedral(cathedralConfig)
	if err != nil {
		panic(err)
	}
	Modules = app.Modules
}

func loadReferences() {
	if _, err := toml.DecodeFile(filepath.Join(resourcesPath, "references.toml"), &References); err != nil {
		panic(err)
	}
}

func init() {
	resolvePaths()
	loadModules()
	loadReferences()
}

func RunMain(m *testing.M) {
	os.Exit(m.Run())
}
