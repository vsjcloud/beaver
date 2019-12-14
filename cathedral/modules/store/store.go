package store

import (
	"context"
)

type ID struct {
	Partition string
	Sort      string
}

type RawValue interface {
	Decode(out interface{}) error
}

type Store interface {
	Put(ctx context.Context, id ID, value interface{}) error
	PutIfNotExists(ctx context.Context, id ID, value interface{}) error
	Get(ctx context.Context, id ID) (RawValue, error)
	Delete(ctx context.Context, id ID) error
	DoesItemExists(ctx context.Context, key ID) (bool, error)
	BulkPut(ctx context.Context, items map[ID]interface{}) error
	BulkDelete(ctx context.Context, ids map[ID]bool) error
	BulkGet(ctx context.Context, ids map[ID]bool) (map[ID]RawValue, error)
	BulkGetPartitionPage(ctx context.Context, partition string, start string) (map[ID]RawValue, ID, error)
}
