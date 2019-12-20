package service

import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
)

var GRPCErrUnauthorized = status.Error(codes.PermissionDenied, "unauthorized")

func GRPCInternalErr(err error) error {
	return status.Error(codes.Internal, err.Error())
}

func HTTPErrUnauthorized(w http.ResponseWriter) {
	http.Error(w, "unauthorized", http.StatusUnauthorized)
}

func HTTPErrServer(w http.ResponseWriter) {
	http.Error(w, "server error", http.StatusInternalServerError)
}
