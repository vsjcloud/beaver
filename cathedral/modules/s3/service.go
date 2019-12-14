package s3

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"io"
	"time"
)

const (
	ACLPrivate    = "private"
	ACLPublicRead = "public-read"
)

type Service struct {
	client   *s3.S3
	uploader *s3manager.Uploader
	bucket   string
}

func NewService(sess *session.Session, bucket string) *Service {
	client := s3.New(sess)
	return &Service{
		client:   client,
		uploader: s3manager.NewUploaderWithClient(client),
		bucket:   bucket,
	}
}

func (s *Service) PutObject(ctx context.Context, key string, body io.Reader, acl string) error {
	input := s3manager.UploadInput{
		Bucket: &s.bucket,
		Key:    &key,
		Body:   body,
		ACL:    &acl,
	}
	_, err := s.uploader.UploadWithContext(ctx, &input)
	return err
}

func (s *Service) GetPublicURL(key string) string {
	return fmt.Sprintf("https://s3-%s.amazonaws.com/%s/%s", *s.client.Config.Region, s.bucket, key)
}

func (s *Service) GetSignedURL(key string, duration time.Duration) (string, error) {
	input := s3.GetObjectInput{
		Bucket: &s.bucket,
		Key:    &key,
	}
	req, _ := s.client.GetObjectRequest(&input)
	url, err := req.Presign(duration)
	if err != nil {
		return "", err
	}
	return url, nil
}

func (s *Service) DoesObjectExist(ctx context.Context, key string) (bool, error) {
	input := s3.HeadObjectInput{
		Bucket: &s.bucket,
		Key:    &key,
	}
	_, err := s.client.HeadObjectWithContext(ctx, &input)
	if err != nil {
		if awsErr, ok := err.(awserr.Error); ok {
			// TODO: Work out since SDK does not have NotFound error code
			// Follow up here: https://github.com/aws/aws-sdk-go/issues/1208
			if awsErr.Code() == "NotFound" || awsErr.Code() == s3.ErrCodeNoSuchKey {
				return false, nil
			}
		}
		return false, err
	}
	return true, nil
}

func (s *Service) DeleteObject(ctx context.Context, key string) error {
	input := s3.DeleteObjectInput{
		Bucket: &s.bucket,
		Key:    &key,
	}
	_, err := s.client.DeleteObjectWithContext(ctx, &input)
	return err
}
