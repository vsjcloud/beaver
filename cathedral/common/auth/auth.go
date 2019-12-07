package auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"strings"
	"time"
)

type Auth struct {
	config *config.Auth
}

func NewAuth(config *config.Auth) *Auth {
	return &Auth{
		config: config,
	}
}

type header struct {
	Typ string
	Alg string
}

type Claims struct {
	Exp int64
	Sub string
}

func (a *Auth) ParseToken(token string) (*Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}

	headerJSON, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, err
	}

	var tokenHeader header
	if err = json.Unmarshal(headerJSON, &tokenHeader); err != nil {
		return nil, err
	}

	if tokenHeader.Typ != "JWT" || tokenHeader.Alg != "HS256" {
		return nil, errors.New("invalid token header")
	}

	claimsJSON, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, err
	}

	tokenClaims := &Claims{}
	if err = json.Unmarshal(claimsJSON, &tokenClaims); err != nil {
		return nil, err
	}

	if tokenClaims.Exp <= time.Now().Unix() {
		return nil, errors.New("token is expired")
	}

	sig, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, err
	}

	hm := hmac.New(sha256.New, []byte(a.config.SigningSecret))
	if _, err = hm.Write([]byte(token[:len(parts[0])+len(parts[1])+1])); err != nil {
		return nil, err
	}
	resultHash := hm.Sum(nil)

	if hmac.Equal(sig, resultHash) {
		return tokenClaims, nil
	}

	return nil, errors.New("token signature is not matched")
}
