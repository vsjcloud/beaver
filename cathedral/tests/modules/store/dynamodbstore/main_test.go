package dynamodbstore

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/modules/store/dynamodbstore"
	"github.com/vsjcloud/beaver/cathedral/tests/tester"
	"testing"
)

var dynamodbStore store.Store

func TestMain(m *testing.M) {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(
			tester.References.DynamoDBStore.AWSAccessKeyID,
			tester.References.DynamoDBStore.AWSSecretAccessKey,
			"",
		),
	})
	if err != nil {
		panic(err)
	}
	dynamodbStore = dynamodbstore.NewDynamoDBStore(sess, tester.References.DynamoDBStore.Table)
	tester.RunMain(m)
}
