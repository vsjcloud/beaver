package main

import (
	"github.com/vsjcloud/beaver/cathedral/cathedral"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"log"
	"os"
)

func main() {
	cathedralConfig, err := config.LoadConfigFromFile(os.Getenv("CATHEDRAL_CONFIG"))
	if err != nil {
		log.Panicf("cannot read config file: %v", err)
	}
	app, err := cathedral.NewCathedral(cathedralConfig)
	if err != nil {
		log.Panicf("cannot instantiate Cathedral: %v", err)
	}
	app.Serve()
}
