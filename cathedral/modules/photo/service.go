package photo

import (
	"github.com/go-chi/chi"
	"github.com/vsjcloud/beaver/cathedral/common/auth"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/common/service"
	"net/http"
)

type Service struct {
	auth   *auth.Auth
	config *config.Photo
}

func NewService(config *config.Photo, auth *auth.Auth) *Service {
	return &Service{
		auth:   auth,
		config: config,
	}
}

func (s *Service) RegisterRoutes(router chi.Router) {
	router.Post("/upload", s.uploadPhoto)
}

func (s *Service) uploadPhoto(w http.ResponseWriter, r *http.Request) {
	if !service.HTTPAuthorized(s.auth, r) {
		service.HTTPErrUnauthorized(w)
		return
	}

	if err := r.ParseMultipartForm(s.config.MaxUploadSize); err != nil {
		http.Error(w, "cannot parse form", http.StatusBadRequest)
		return
	}

	photo, _, err := r.FormFile("photo")
	if err != nil {
		http.Error(w, "error while retrieving photo", http.StatusBadRequest)
		return
	}
	defer photo.Close()
}
