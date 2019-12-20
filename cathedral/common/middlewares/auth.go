package middlewares

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"net/http"
	"strings"
	"time"
)

var errInvalidToken = errors.New("invalid JWT token")

type AuthHeader struct {
	Typ string
	Alg string
}

type AuthClaims struct {
	Exp int64
	Sub string
}

func getAuthClaims(secret []byte, token string) (*AuthClaims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errInvalidToken
	}

	headerJSON, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, err
	}

	var tokenHeader AuthHeader
	if err = json.Unmarshal(headerJSON, &tokenHeader); err != nil {
		return nil, err
	}

	if tokenHeader.Typ != "JWT" || tokenHeader.Alg != "HS256" {
		return nil, errInvalidToken
	}

	claimsJSON, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, err
	}

	tokenClaims := &AuthClaims{}
	if err = json.Unmarshal(claimsJSON, &tokenClaims); err != nil {
		return nil, err
	}

	if tokenClaims.Exp <= time.Now().Unix() {
		return nil, errInvalidToken
	}

	sig, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, err
	}

	hm := hmac.New(sha256.New, secret)
	if _, err = hm.Write([]byte(token[:len(parts[0])+len(parts[1])+1])); err != nil {
		return nil, err
	}
	resultHash := hm.Sum(nil)

	if hmac.Equal(sig, resultHash) {
		return tokenClaims, nil
	}

	return nil, errInvalidToken
}

type authContextKey string

var AuthContextKey = authContextKey("AuthContextKey")

func Auth(config *config.Auth) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			rr := r
			if h := r.Header.Get("Authorization"); len(h) > 7 && h[0:7] == "Bearer " {
				if claims, err := getAuthClaims([]byte(config.SigningSecret), h[7:]); err == nil {
					rr = r.WithContext(context.WithValue(r.Context(), AuthContextKey, claims))
				}
			}
			next.ServeHTTP(w, rr)
		})
	}
}
