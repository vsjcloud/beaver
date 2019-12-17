package cachestore

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/id"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/tests/tester"
	"testing"
)

var (
	firstItemID    = id.PhotoIDToStoreID(id.GenerateProjectID())
	firstItemValue = &model.Project{
		Name:        "First project",
		Description: "First description",
	}
	secondItemID    = id.PhotoIDToStoreID(id.GenerateProjectID())
	secondItemValue = &model.Project{
		Name:        "Second project",
		Description: "Second description",
	}
	thirdItemID    = id.PhotoIDToStoreID(id.GenerateProjectID())
	thirdItemValue = &model.Project{
		Name:        "Third project",
		Description: "third description",
	}
)

func TestPut(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		assert.NoError(t, cacheStore.Put(ctx, firstItemID, firstItemValue))
		raw, err := cacheStore.Get(ctx, firstItemID)
		assert.NoError(t, err)
		actual := &model.Project{}
		assert.NoError(t, raw.Decode(actual))
		assert.Equal(t, firstItemValue, actual)
		assert.NoError(t, cacheStore.Delete(ctx, firstItemID))
	})
}

func TestPutAlreadyExistedID(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		assert.NoError(t, cacheStore.Put(ctx, firstItemID, firstItemValue))
		assert.NoError(t, cacheStore.Put(ctx, firstItemID, secondItemValue))
		raw, err := cacheStore.Get(ctx, firstItemID)
		assert.NoError(t, err)
		actual := &model.Project{}
		assert.NoError(t, raw.Decode(actual))
		assert.Equal(t, secondItemValue, actual)
		assert.NoError(t, cacheStore.Delete(ctx, firstItemID))
	})
}

func TestPutIfNotExists(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		assert.NoError(t, cacheStore.Put(ctx, firstItemID, firstItemValue))
		ok, err := cacheStore.PutIfNotExists(ctx, firstItemID, secondItemValue)
		assert.False(t, ok)
		assert.NoError(t, err)
		raw, err := cacheStore.Get(ctx, firstItemID)
		assert.NoError(t, err)
		actual := &model.Project{}
		assert.NoError(t, raw.Decode(actual))
		assert.Equal(t, firstItemValue, actual)
		assert.NoError(t, cacheStore.Delete(ctx, firstItemID))
	})
}

func TestGetNonExistedID(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		_, err := cacheStore.Get(ctx, thirdItemID)
		assert.Equal(t, store.ErrNoSuchItem, err)
	})
}

func TestBulkPut(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		items := map[store.ID]interface{}{
			firstItemID:  firstItemValue,
			secondItemID: secondItemValue,
			thirdItemID:  thirdItemValue,
		}
		assert.NoError(t, cacheStore.BulkPut(ctx, items))
		ok, err := cacheStore.DoesItemExists(ctx, firstItemID)
		assert.NoError(t, err)
		assert.True(t, ok)
		ok, err = cacheStore.DoesItemExists(ctx, secondItemID)
		assert.NoError(t, err)
		assert.True(t, ok)
		ok, err = cacheStore.DoesItemExists(ctx, thirdItemID)
		assert.NoError(t, err)
		assert.True(t, ok)
		ids := map[store.ID]bool{
			firstItemID:  true,
			secondItemID: true,
			thirdItemID:  true,
		}
		assert.NoError(t, cacheStore.BulkDelete(ctx, ids))
	})
}

func TestBulkGet(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		items := map[store.ID]interface{}{
			firstItemID:  firstItemValue,
			secondItemID: secondItemValue,
			thirdItemID:  thirdItemValue,
		}
		assert.NoError(t, cacheStore.BulkPut(ctx, items))
		ids := map[store.ID]bool{
			firstItemID:  true,
			secondItemID: true,
			thirdItemID:  true,
		}
		raws, err := cacheStore.BulkGet(ctx, ids)
		assert.NoError(t, err)
		actualFirst := &model.Project{}
		assert.NoError(t, raws[firstItemID].Decode(actualFirst))
		assert.Equal(t, firstItemValue, actualFirst)
		actualSecond := &model.Project{}
		assert.NoError(t, raws[secondItemID].Decode(actualSecond))
		assert.Equal(t, secondItemValue, actualSecond)
		actualThird := &model.Project{}
		assert.NoError(t, raws[thirdItemID].Decode(actualThird))
		assert.Equal(t, thirdItemValue, actualThird)
		assert.NoError(t, cacheStore.BulkDelete(ctx, ids))
	})
}

func TestBulkGetPartitionPage(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		items := map[store.ID]interface{}{
			firstItemID:  firstItemValue,
			secondItemID: secondItemValue,
			thirdItemID:  thirdItemValue,
		}
		assert.NoError(t, cacheStore.BulkPut(ctx, items))
		raws, err := cacheStore.BulkGetPartition(ctx, id.ProjectIDPrefix)
		assert.NoError(t, err)
		actualFirst := &model.Project{}
		assert.NoError(t, raws[firstItemID].Decode(actualFirst))
		assert.Equal(t, firstItemValue, actualFirst)
		actualSecond := &model.Project{}
		assert.NoError(t, raws[secondItemID].Decode(actualSecond))
		assert.Equal(t, secondItemValue, actualSecond)
		actualThird := &model.Project{}
		assert.NoError(t, raws[thirdItemID].Decode(actualThird))
		assert.Equal(t, thirdItemValue, actualThird)
		ids := map[store.ID]bool{
			firstItemID:  true,
			secondItemID: true,
			thirdItemID:  true,
		}
		assert.NoError(t, cacheStore.BulkDelete(ctx, ids))
	})
}

