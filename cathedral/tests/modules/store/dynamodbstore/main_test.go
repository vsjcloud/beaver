package dynamodbstore

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/vsjcloud/beaver/cathedral/modules/store/dynamodbstore"
	"github.com/vsjcloud/beaver/cathedral/tests/tester"
	"testing"
)

var store *dynamodbstore.DynamoDBStore

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
	store = dynamodbstore.NewDynamoDBStore(sess, tester.References.DynamoDBStore.Table)
	tester.RunMain(m)
}
