package store

import (
	"context"
	"github.com/vsjcloud/beaver/cathedral/common/id"
	"github.com/vsjcloud/beaver/cathedral/modules/store/rawvalue"
)

// TODO: add support for permissions
type Store interface {
	Put(ctx context.Context, id id.ID, value interface{}) error
	PutIfNotExists(ctx context.Context, id id.ID, value interface{}) (bool, error)
	Get(ctx context.Context, id id.ID) (rawvalue.RawValue, error)
	Delete(ctx context.Context, id id.ID) error
	DoesItemExists(ctx context.Context, id id.ID) (bool, error)
	BulkPut(ctx context.Context, items map[id.ID]interface{}) error
	BulkDelete(ctx context.Context, ids map[id.ID]bool) error
	BulkGet(ctx context.Context, ids map[id.ID]bool) (map[id.ID]rawvalue.RawValue, error)
	BulkGetPartition(ctx context.Context, partition string) (map[id.ID]rawvalue.RawValue, error)
	BulkGetPartitionIDs(ctx context.Context, partition string) (map[id.ID]bool, error)
}
