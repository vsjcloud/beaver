package middlewares

import (
	"github.com/rs/cors"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"net/http"
)

func CORS(config *config.CORS) func(http.Handler) http.Handler {
	c := cors.New(cors.Options{
		AllowedOrigins:   config.AllowedOrigins,
		AllowedMethods:   config.AllowedMethods,
		AllowedHeaders:   config.AllowedHeaders,
		AllowCredentials: config.AllowCredentials,
		MaxAge:           config.MaxAge,
	})
	return c.Handler
}
