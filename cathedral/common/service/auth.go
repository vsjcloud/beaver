package service

import (
	"context"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

var ErrUnauthorized = status.Error(codes.PermissionDenied, "unauthorized")

func Authorized(auth *auth.Auth, ctx context.Context) bool {
	md, ok := metadata.FromIncomingContext(ctx)
	if ok {
		v := md.Get("authorization")
		if len(v) > 0 {
			_, err := auth.ParseToken(v[0])
			return err == nil
		}
	}
	return false
}
