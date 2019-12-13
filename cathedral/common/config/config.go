package config

import (
	"github.com/BurntSushi/toml"
)

type Mode string

type HTTP struct {
	Address string `toml:"address"`
	APIPath string `toml:"api_path"`
}

type CORS struct {
	AllowedOrigins   []string `toml:"allowed_origins"`
	AllowedMethods   []string `toml:"allowed_methods"`
	AllowedHeaders   []string `toml:"allowed_headers"`
	AllowCredentials bool     `toml:"allowed_credentials"`
	MaxAge           int      `toml:"max_age"`
}

type Auth struct {
	SigningSecret string `toml:"signing_secret"`
}

type Photo struct {
	MaxUploadSize int64 `toml:"max_upload_size"`
}

type Cathedral struct {
	Mode  Mode   `toml:"mode"`
	HTTP  *HTTP  `toml:"http"`
	CORS  *CORS  `toml:"cors"`
	Auth  *Auth  `toml:"auth"`
	Photo *Photo `toml:"photo"`
}

func LoadConfigFromFile(configPath string) (*Cathedral, error) {
	cathedral := &Cathedral{}
	if _, err := toml.DecodeFile(configPath, cathedral); err != nil {
		return nil, err
	}
	return cathedral, nil
}
