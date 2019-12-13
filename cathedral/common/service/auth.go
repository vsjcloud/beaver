package service

import (
	"context"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"net/http"
)

var GRPCErrUnauthorized = status.Error(codes.PermissionDenied, "unauthorized")

func GRPCAuthorized(auth *auth.Auth, ctx context.Context) bool {
	md, ok := metadata.FromIncomingContext(ctx)
	if ok {
		v := md.Get("auth-token")
		if len(v) > 0 {
			_, err := auth.ParseToken(v[0])
			return err == nil
		}
	}
	return false
}

func HTTPErrUnauthorized(w http.ResponseWriter) {
	http.Error(w, "unauthorized", http.StatusUnauthorized)
}

func HTTPAuthorized(auth *auth.Auth, r *http.Request) bool {
	if h := r.Header.Get("Authorization"); len(h) > 7 && h[0:7] == "Bearer " {
		_, err := auth.ParseToken(h[7:])
		return err == nil
	}
	return false
}
