package s3

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/vsjcloud/beaver/cathedral/modules/s3"
	"github.com/vsjcloud/beaver/cathedral/tests/tester"
	"strings"
	"testing"
)

func TestPutObject(t *testing.T) {
	key := "public_object"
	content := strings.NewReader("public_object content")

	tester.WithTimeoutContext(tester.DefaultTimeout, func(ctx context.Context) {
		ok, err := service.DoesObjectExist(ctx, key)
		assert.NoError(t, err)
		assert.False(t, ok)
		assert.NoError(t, service.PutObject(ctx, key, content, s3.ACLPrivate))
		ok, err = service.DoesObjectExist(ctx, key)
		assert.NoError(t, err)
		assert.True(t, ok)
		assert.NoError(t, service.DeleteObject(ctx, key))
	})
}
