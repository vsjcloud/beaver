package middlewares

import (
	"fmt"
	"github.com/go-chi/chi/middleware"
	"go.uber.org/zap"
	"net/http"
)

type wrappedLogger struct {
	logger *zap.Logger
}

func (w *wrappedLogger) Print(v ...interface{}) {
	w.logger.Info(fmt.Sprint(v...))
}

func Logger(logger *zap.Logger) func(http.Handler) http.Handler {
	return middleware.RequestLogger(&middleware.DefaultLogFormatter{
		Logger:  &wrappedLogger{logger},
		NoColor: false,
	})
}
