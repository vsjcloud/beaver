package dynamodbstore

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"github.com/vsjcloud/beaver/cathedral/modules/store/rawvalue"
)

const (
	batchGetItemLimit   = 100
	batchWriteItemLimit = 25

	partitionIDField = "pid"
	sortIDField      = "sid"
	valueField       = "v"
)

type DynamoDBStore struct {
	client *dynamodb.DynamoDB
	table  string
}

func NewDynamoDBStore(sess *session.Session, table string) *DynamoDBStore {
	return &DynamoDBStore{
		client: dynamodb.New(sess),
		table:  table,
	}
}

func (d *DynamoDBStore) Put(ctx context.Context, id store.ID, value interface{}) error {
	av, err := encodeItem(id, value)
	if err != nil {
		return err
	}
	input := dynamodb.PutItemInput{
		Item:      av,
		TableName: &d.table,
	}
	_, err = d.client.PutItemWithContext(ctx, &input)
	return err
}

func (d *DynamoDBStore) PutIfNotExists(ctx context.Context, id store.ID, value interface{}) (bool, error) {
	av, err := encodeItem(id, value)
	if err != nil {
		return false, err
	}
	input := dynamodb.PutItemInput{
		Item:                av,
		ConditionExpression: aws.String(fmt.Sprintf("attribute_not_exists(%s)", partitionIDField)),
		TableName:           &d.table,
	}
	_, err = d.client.PutItemWithContext(ctx, &input)
	if err != nil {
		if awsErr, ok := err.(awserr.Error); ok {
			if awsErr.Code() == dynamodb.ErrCodeConditionalCheckFailedException {
				return false, nil
			}
		}
		return false, err
	}
	return true, nil
}

func (d *DynamoDBStore) Get(ctx context.Context, id store.ID) (rawvalue.RawValue, error) {
	avID, err := encodeID(id)
	if err != nil {
		return nil, err
	}
	input := dynamodb.GetItemInput{
		Key:                  avID,
		ProjectionExpression: aws.String(valueField),
		TableName:            &d.table,
	}
	output, err := d.client.GetItemWithContext(ctx, &input)
	if err != nil {
		return nil, err
	}
	av, ok := output.Item[valueField]
	if !ok {
		return nil, store.ErrNoSuchItem
	}
	return rawvalue.AVToDynamoDBAVRawValue(globalDecoder, av), nil
}

func (d *DynamoDBStore) Delete(ctx context.Context, id store.ID) error {
	avID, err := encodeID(id)
	if err != nil {
		return err
	}
	input := dynamodb.DeleteItemInput{
		Key:       avID,
		TableName: &d.table,
	}
	_, err = d.client.DeleteItemWithContext(ctx, &input)
	return err
}

func (d *DynamoDBStore) DoesItemExists(ctx context.Context, key store.ID) (bool, error) {
	_, err := d.Get(ctx, key)
	if err != nil {
		if err == store.ErrNoSuchItem {
			return false, nil
		}
		return false, err
	}
	return true, nil
}

func (d *DynamoDBStore) bulkWrite(ctx context.Context, reqs []*dynamodb.WriteRequest) error {
	for len(reqs) > 0 {
		n := len(reqs)
		if n > batchWriteItemLimit {
			n = batchWriteItemLimit
		}
		tables := make(map[string][]*dynamodb.WriteRequest)
		tables[d.table] = reqs[:n]
		reqs = reqs[n:]
		input := dynamodb.BatchWriteItemInput{
			RequestItems: tables,
		}
		output, err := d.client.BatchWriteItemWithContext(ctx, &input)
		if err != nil {
			return err
		}
		if output.UnprocessedItems != nil {
			reqs = append(reqs, output.UnprocessedItems[d.table]...)
		}
	}
	return nil
}

func (d *DynamoDBStore) BulkPut(ctx context.Context, items map[store.ID]interface{}) error {
	reqs := make([]*dynamodb.WriteRequest, len(items))
	i := 0
	for id, value := range items {
		av, err := encodeItem(id, value)
		if err != nil {
			return err
		}
		reqs[i] = &dynamodb.WriteRequest{
			PutRequest: &dynamodb.PutRequest{
				Item: av,
			},
		}
		i++
	}
	return d.bulkWrite(ctx, reqs)
}

func (d *DynamoDBStore) BulkDelete(ctx context.Context, ids map[store.ID]bool) error {
	reqs := make([]*dynamodb.WriteRequest, len(ids))
	i := 0
	for id := range ids {
		avID, err := encodeID(id)
		if err != nil {
			return err
		}
		reqs[i] = &dynamodb.WriteRequest{
			DeleteRequest: &dynamodb.DeleteRequest{
				Key: avID,
			},
		}
		i++
	}
	return d.bulkWrite(ctx, reqs)
}

func (d *DynamoDBStore) BulkGet(ctx context.Context, ids map[store.ID]bool) (map[store.ID]rawvalue.RawValue, error) {
	items := make(map[store.ID]rawvalue.RawValue)
	avKeys := make([]map[string]*dynamodb.AttributeValue, len(ids))
	i := 0
	for id := range ids {
		var err error
		avKeys[i], err = encodeID(id)
		if err != nil {
			return nil, err
		}
		i++
	}
	for len(avKeys) > 0 {
		n := len(avKeys)
		if n > batchGetItemLimit {
			n = batchGetItemLimit
		}
		tables := make(map[string]*dynamodb.KeysAndAttributes)
		tables[d.table] = &dynamodb.KeysAndAttributes{
			Keys: avKeys[:n],
		}
		avKeys = avKeys[n:]
		input := dynamodb.BatchGetItemInput{
			RequestItems: tables,
		}
		output, err := d.client.BatchGetItemWithContext(ctx, &input)
		if err != nil {
			return nil, err
		}
		if output.Responses != nil {
			for _, av := range output.Responses[d.table] {
				avValue, ok := av[valueField]
				if !ok {
					return nil, store.ErrNoSuchItem
				}
				items[decodeID(av)] = rawvalue.AVToDynamoDBAVRawValue(globalDecoder, avValue)
			}
		}
		if output.UnprocessedKeys != nil && output.UnprocessedKeys[d.table] != nil {
			avKeys = append(avKeys, output.UnprocessedKeys[d.table].Keys...)
		}
	}
	return items, nil
}

func (d *DynamoDBStore) BulkGetPartition(ctx context.Context, partition string) (map[store.ID]rawvalue.RawValue, error) {
	var exclusiveStartKey map[string]*dynamodb.AttributeValue
	avPartitionKey, err := globalEncoder.Encode(partition)
	if err != nil {
		return nil, err
	}
	items := make(map[store.ID]rawvalue.RawValue)
	for {
		expressionAttributeValues := make(map[string]*dynamodb.AttributeValue)
		expressionAttributeValues[":partitionKey"] = avPartitionKey
		input := dynamodb.QueryInput{
			ExclusiveStartKey:         exclusiveStartKey,
			KeyConditionExpression:    aws.String(partitionIDField + "= :partitionKey"),
			ExpressionAttributeValues: expressionAttributeValues,
			TableName:                 &d.table,
		}
		output, err := d.client.QueryWithContext(ctx, &input)
		if err != nil {
			return nil, err
		}
		for _, av := range output.Items {
			avValue, ok := av[valueField]
			if !ok {
				return nil, store.ErrNoSuchItem
			}
			items[decodeID(av)] = rawvalue.AVToDynamoDBAVRawValue(globalDecoder, avValue)
		}
		if _, ok := output.LastEvaluatedKey[partitionIDField]; !ok {
			break
		} else {
			exclusiveStartKey = output.LastEvaluatedKey
		}
	}
	return items, nil
}
