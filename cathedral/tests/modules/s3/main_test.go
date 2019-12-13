package s3

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/vsjcloud/beaver/cathedral/modules/s3"
	"github.com/vsjcloud/beaver/cathedral/tests/tester"
	"testing"
)

var service *s3.Service

func TestMain(m *testing.M) {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-southeast-1"),
		Credentials: credentials.NewStaticCredentials(
			tester.References.S3.AWSAccessKeyID,
			tester.References.S3.AWSSecretAccessKey,
			"",
	)})
	if err != nil {
		panic(err)
	}
	service = s3.NewService(sess, tester.References.S3.Bucket)
	tester.RunMain(m)
}
