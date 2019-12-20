package dynamodbstore

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	idCommon "github.com/vsjcloud/beaver/cathedral/common/id"
)

var (
	globalEncoder = dynamodbattribute.NewEncoder()
	globalDecoder = dynamodbattribute.NewDecoder()
)

func encodeItem(id idCommon.ID, value interface{}) (map[string]*dynamodb.AttributeValue, error) {
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

func encodeID(id idCommon.ID) (map[string]*dynamodb.AttributeValue, error) {
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

func decodeID(av map[string]*dynamodb.AttributeValue) idCommon.ID {
	if av == nil {
		return idCommon.ID{}
	}
	id := idCommon.ID{}
	if v, ok := av[partitionIDField]; ok {
		id.Partition = *v.S
	}
	if v, ok := av[sortIDField]; ok {
		id.Sort = *v.S
	}
	return id
}
