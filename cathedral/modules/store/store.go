package store

import (
	"context"
	"github.com/vsjcloud/beaver/cathedral/modules/store/rawvalue"
)

type ID struct {
	Partition string `json:"pid"`
	Sort      string `json:"sid"`
}

type Store interface {
	Put(ctx context.Context, id ID, value interface{}) error
	PutIfNotExists(ctx context.Context, id ID, value interface{}) (bool, error)
	Get(ctx context.Context, id ID) (rawvalue.RawValue, error)
	Delete(ctx context.Context, id ID) error
	DoesItemExists(ctx context.Context, id ID) (bool, error)
	BulkPut(ctx context.Context, items map[ID]interface{}) error
	BulkDelete(ctx context.Context, ids map[ID]bool) error
	BulkGet(ctx context.Context, ids map[ID]bool) (map[ID]rawvalue.RawValue, error)
	BulkGetPartition(ctx context.Context, partition string) (map[ID]rawvalue.RawValue, error)
}
