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
	AWSRegion          string `toml:"aws_region"`
	AWSAccessKeyID     string `toml:"aws_access_key_id"`
	AWSSecretAccessKey string `toml:"aws_secret_access_key"`
	S3Bucket           string `toml:"s3_bucket"`
	AWSSessionToken    string `toml:"aws_session_token"`
	MaxUploadSize      int64  `toml:"max_upload_size"`
}

type ModelStore struct {
	AWSRegion          string `toml:"aws_region"`
	AWSAccessKeyID     string `toml:"aws_access_key_id"`
	AWSSecretAccessKey string `toml:"aws_secret_access_key"`
	AWSSessionToken    string `toml:"aws_session_token"`
	DynamoDBTable      string `toml:"dynamodb_table"`
	MaxCacheSize       int    `toml:"max_cache_size"`
}

type Cathedral struct {
	Mode       Mode        `toml:"mode"`
	HTTP       *HTTP       `toml:"http"`
	CORS       *CORS       `toml:"cors"`
	Auth       *Auth       `toml:"auth"`
	Photo      *Photo      `toml:"photo"`
	ModelStore *ModelStore `toml:"model_store"`
}

func LoadConfigFromFile(configPath string) (*Cathedral, error) {
	cathedral := &Cathedral{}
	if _, err := toml.DecodeFile(configPath, cathedral); err != nil {
		return nil, err
	}
	return cathedral, nil
}
