package store

import (
	"errors"
)

var ErrNoSuchItem = errors.New("the requested item does not exist")
