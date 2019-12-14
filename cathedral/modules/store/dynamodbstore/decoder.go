package dynamodbstore

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

type rawValue struct {
	decoder *dynamodbattribute.Decoder
	av      *dynamodb.AttributeValue
}

func (v rawValue) Decode(out interface{}) error {
	return v.decoder.Decode(v.av, out)
}
