package dynamodbstore

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/vsjcloud/beaver/cathedral/generated/proto/model"
	"github.com/vsjcloud/beaver/cathedral/id"
	gStore "github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/modules/store/dynamodbstore"
	"github.com/vsjcloud/beaver/cathedral/tests/tester"
	"testing"
)

var (
	firstItemID    = id.ProjectIDStore(id.GenerateProjectID())
	firstItemValue = &model.Project{
		Name:        "First project",
		Description: "First description",
	}
	secondItemID    = id.ProjectIDStore(id.GenerateProjectID())
	secondItemValue = &model.Project{
		Name:        "Second project",
		Description: "Second description",
	}
	thirdItemID    = id.ProjectIDStore(id.GenerateProjectID())
	thirdItemValue = &model.Project{
		Name:        "Third project",
		Description: "third description",
	}
)

func TestPut(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		assert.NoError(t, store.Put(ctx, firstItemID, firstItemValue))
		raw, err := store.Get(ctx, firstItemID)
		assert.NoError(t, err)
		actual := &model.Project{}
		assert.NoError(t, raw.Decode(actual))
		assert.Equal(t, firstItemValue, actual)
		assert.NoError(t, store.Delete(ctx, firstItemID))
	})
}

func TestPutAlreadyExistedID(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		assert.NoError(t, store.Put(ctx, firstItemID, firstItemValue))
		assert.NoError(t, store.Put(ctx, firstItemID, secondItemValue))
		raw, err := store.Get(ctx, firstItemID)
		assert.NoError(t, err)
		actual := &model.Project{}
		assert.NoError(t, raw.Decode(actual))
		assert.Equal(t, secondItemValue, actual)
		assert.NoError(t, store.Delete(ctx, firstItemID))
	})
}

func TestPutIfNotExists(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		assert.NoError(t, store.Put(ctx, firstItemID, firstItemValue))
		assert.NoError(t, store.PutIfNotExists(ctx, firstItemID, secondItemValue))
		raw, err := store.Get(ctx, firstItemID)
		assert.NoError(t, err)
		actual := &model.Project{}
		assert.NoError(t, raw.Decode(actual))
		assert.Equal(t, firstItemValue, actual)
		assert.NoError(t, store.Delete(ctx, firstItemID))
	})
}

func TestGetNonExistedID(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		_, err := store.Get(ctx, thirdItemID)
		assert.Equal(t, dynamodbstore.ErrNoSuchItem, err)
	})
}

func TestBulkPut(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		items := map[gStore.ID]interface{}{
			firstItemID:  firstItemValue,
			secondItemID: secondItemValue,
			thirdItemID:  thirdItemValue,
		}
		assert.NoError(t, store.BulkPut(ctx, items))
		ok, err := store.DoesItemExists(ctx, firstItemID)
		assert.NoError(t, err)
		assert.True(t, ok)
		ok, err = store.DoesItemExists(ctx, secondItemID)
		assert.NoError(t, err)
		assert.True(t, ok)
		ok, err = store.DoesItemExists(ctx, thirdItemID)
		assert.NoError(t, err)
		assert.True(t, ok)
		ids := map[gStore.ID]bool{
			firstItemID:  true,
			secondItemID: true,
			thirdItemID:  true,
		}
		assert.NoError(t, store.BulkDelete(ctx, ids))
	})
}

func TestBulkGet(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		items := map[gStore.ID]interface{}{
			firstItemID:  firstItemValue,
			secondItemID: secondItemValue,
			thirdItemID:  thirdItemValue,
		}
		assert.NoError(t, store.BulkPut(ctx, items))
		ids := map[gStore.ID]bool{
			firstItemID:  true,
			secondItemID: true,
			thirdItemID:  true,
		}
		raws, err := store.BulkGet(ctx, ids)
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
		assert.NoError(t, store.BulkDelete(ctx, ids))
	})
}

func TestBulkGetPartitionPage(t *testing.T) {
	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		items := map[gStore.ID]interface{}{
			firstItemID:  firstItemValue,
			secondItemID: secondItemValue,
			thirdItemID:  thirdItemValue,
		}
		assert.NoError(t, store.BulkPut(ctx, items))
		raws, _, err := store.BulkGetPartitionPage(ctx, id.ProjectIDPrefix, "")
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
		ids := map[gStore.ID]bool{
			firstItemID:  true,
			secondItemID: true,
			thirdItemID:  true,
		}
		assert.NoError(t, store.BulkDelete(ctx, ids))
	})
}
