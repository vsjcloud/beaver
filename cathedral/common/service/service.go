package service

import (
	"context"
	"net/http"
	"time"
)

func HTTPWithTimeout(
	timeout time.Duration,
	handlerFunc func(http.ResponseWriter, *http.Request),
) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), timeout)
		defer cancel()
		handlerFunc(w, r.WithContext(ctx))
	}
}
