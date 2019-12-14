package dynamodbstore

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
)

var (
	globalEncoder = dynamodbattribute.NewEncoder()
	globalDecoder = dynamodbattribute.NewDecoder()
)

func encodeItem(id store.ID, value interface{}) (map[string]*dynamodb.AttributeValue, error) {
	av, err := encodeID(id)
	if err != nil {
		return nil, err
	}
	encodedValue, err := globalEncoder.Encode(value)
	if err != nil {
		return nil, err
	}
	av[valueField] = encodedValue
	return av, nil
}

func encodeID(id store.ID) (map[string]*dynamodb.AttributeValue, error) {
	encodedPartitionID, err := globalEncoder.Encode(id.Partition)
	if err != nil {
		return nil, err
	}
	encodedSortID, err := globalEncoder.Encode(id.Sort)
	if err != nil {
		return nil, err
	}
	av := make(map[string]*dynamodb.AttributeValue)
	av[partitionIDField] = encodedPartitionID
	av[sortIDField] = encodedSortID
	return av, nil
}

func decodeID(av map[string]*dynamodb.AttributeValue) store.ID {
	if av == nil {
		return store.ID{}
	}
	id := store.ID{}
	if v, ok := av[partitionIDField]; ok {
		id.Partition = *v.S
	}
	if v, ok := av[sortIDField]; ok {
		id.Sort = *v.S
	}
	return id
}

func asRawValue(av *dynamodb.AttributeValue) store.RawValue {
	return &rawValue{
		decoder: globalDecoder,
		av:      av,
	}
}
