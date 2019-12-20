package cachestore

import (
	"context"
	"github.com/hashicorp/golang-lru"
	idCommon "github.com/vsjcloud/beaver/cathedral/common/id"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/modules/store/rawvalue"
	"sync"
)

type CacheStore struct {
	store      store.Store
	cache      *lru.ARCCache
	mu         sync.Mutex
	partitions map[string]map[idCommon.ID]bool
}

func NewCacheStore(innerStore store.Store, maxSize int) (*CacheStore, error) {
	cache, err := lru.NewARC(maxSize)
	if err != nil {
		return nil, err
	}
	return &CacheStore{
		store:      innerStore,
		cache:      cache,
		partitions: make(map[string]map[idCommon.ID]bool),
	}, nil
}

func (c *CacheStore) cacheAdd(id idCommon.ID, raw rawvalue.RawValue) {
	c.cache.Add(id, raw)
	if partition, ok := c.partitions[id.Partition]; ok {
		partition[id] = true
	}
}

func (c *CacheStore) cacheGet(id idCommon.ID) (rawvalue.RawValue, error) {
	value, ok := c.cache.Get(id)
	if !ok {
		return nil, store.ErrNoSuchItem
	}
	return value.(rawvalue.RawValue), nil
}

func (c *CacheStore) cacheDelete(id idCommon.ID) {
	c.cache.Remove(id)
	if partition, ok := c.partitions[id.Partition]; ok {
		delete(partition, id)
	}
}

func (c *CacheStore) Put(ctx context.Context, id idCommon.ID, value interface{}) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	err := c.store.Put(ctx, id, value)
	if err != nil {
		return err
	}
	c.cacheAdd(id, rawvalue.InterfaceToUnencodedRawValue(value))
	return nil
}

func (c *CacheStore) PutIfNotExists(ctx context.Context, id idCommon.ID, value interface{}) (bool, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.cache.Contains(id) {
		return false, nil
	}
	ok, err := c.store.PutIfNotExists(ctx, id, value)
	if err != nil {
		return false, err
	}
	if ok {
		c.cacheAdd(id, rawvalue.InterfaceToUnencodedRawValue(value))
		return true, nil
	}
	return false, nil
}

func (c *CacheStore) Get(ctx context.Context, id idCommon.ID) (rawvalue.RawValue, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	raw, err := c.cacheGet(id)
	if err == nil {
		return raw, nil
	}
	if err != store.ErrNoSuchItem {
		return nil, err
	}
	raw, err = c.store.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	c.cacheAdd(id, raw)
	return raw, nil
}

func (c *CacheStore) Delete(ctx context.Context, id idCommon.ID) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if err := c.store.Delete(ctx, id); err != nil {
		return err
	}
	c.cacheDelete(id)
	return nil
}

func (c *CacheStore) DoesItemExists(ctx context.Context, id idCommon.ID) (bool, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if c.cache.Contains(id) {
		return true, nil
	}
	raw, err := c.store.Get(ctx, id)
	if err != nil {
		if err == store.ErrNoSuchItem {
			return false, nil
		}
		return false, err
	}
	c.cacheAdd(id, raw)
	return true, nil
}

func (c *CacheStore) BulkPut(ctx context.Context, items map[idCommon.ID]interface{}) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if err := c.store.BulkPut(ctx, items); err != nil {
		return err
	}
	for id, value := range items {
		c.cacheAdd(id, rawvalue.InterfaceToUnencodedRawValue(value))
	}
	return nil
}

func (c *CacheStore) BulkDelete(ctx context.Context, ids map[idCommon.ID]bool) error {
	c.mu.Lock()
	defer c.mu.Unlock()

	if err := c.store.BulkDelete(ctx, ids); err != nil {
		return err
	}
	for id := range ids {
		c.cacheDelete(id)
	}
	return nil
}

func (c *CacheStore) BulkGet(ctx context.Context, ids map[idCommon.ID]bool) (map[idCommon.ID]rawvalue.RawValue, error) {
	c.mu.Lock()
	defer c.mu.Unlock()

	result := make(map[idCommon.ID]rawvalue.RawValue)
	notInCache := make(map[idCommon.ID]bool)
	for id := range ids {
		raw, err := c.cacheGet(id)
		if err == nil {
			result[id] = raw
		} else if err == store.ErrNoSuchItem {
			notInCache[id] = true
		} else {
			return nil, err
		}
	}
	notInCacheResult, err := c.store.BulkGet(ctx, ids)
	if err != nil {
		return nil, err
	}
	for id, raw := range notInCacheResult {
		c.cacheAdd(id, raw)
		result[id] = raw
	}
	return result, nil
}

func (c *CacheStore) BulkGetPartition(ctx context.Context, partition string) (map[idCommon.ID]rawvalue.RawValue, error) {
	c.mu.Lock()

	if partitionIDs, ok := c.partitions[partition]; ok {
		c.mu.Unlock()
		return c.BulkGet(ctx, partitionIDs)
	}

	defer c.mu.Unlock()

	result, err := c.store.BulkGetPartition(ctx, partition)
	if err != nil {
		return nil, err
	}
	c.partitions[partition] = make(map[idCommon.ID]bool)
	for id, raw := range result {
		c.cacheAdd(id, raw)
	}
	return result, nil
}
