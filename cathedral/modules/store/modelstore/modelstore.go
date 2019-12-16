package modelstore

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/vsjcloud/beaver/cathedral/common/config"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/modules/store/cachestore"
	"github.com/vsjcloud/beaver/cathedral/modules/store/dynamodbstore"
)

func NewModelStore(config *config.ModelStore) (store.Store, error) {
	sess, err := session.NewSession(&aws.Config{
		Region: &config.AWSRegion,
		Credentials: credentials.NewStaticCredentials(
			config.AWSAccessKeyID,
			config.AWSSecretAccessKey,
			config.AWSSessionToken,
		),
	})
	if err != nil {
		return nil, err
	}
	return cachestore.NewCacheStore(dynamodbstore.NewDynamoDBStore(sess, config.DynamoDBTable), config.MaxCacheSize)
}

