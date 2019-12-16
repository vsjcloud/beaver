package rawvalue

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type DynamoDBAVRawValue struct {
	decoder *dynamodbattribute.Decoder
	av      *dynamodb.AttributeValue
}

func (v *DynamoDBAVRawValue) Decode(out interface{}) error {
	return v.decoder.Decode(v.av, out)
}

func AVToDynamoDBAVRawValue(decoder *dynamodbattribute.Decoder, av *dynamodb.AttributeValue) *DynamoDBAVRawValue {
	return &DynamoDBAVRawValue{
		decoder: decoder,
		av:      av,
	}
}
