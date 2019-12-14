package tester

type references struct {
	S3 struct {
		Region             string `toml:"region"`
		Bucket             string `toml:"bucket"`
		AWSAccessKeyID     string `toml:"aws_access_key_id"`
		AWSSecretAccessKey string `toml:"aws_secret_access_key"`
	} `toml:"s3"`
	DynamoDBStore struct {
		Region             string `toml:"region"`
		Table              string `toml:"table"`
		AWSAccessKeyID     string `toml:"aws_access_key_id"`
		AWSSecretAccessKey string `toml:"aws_secret_access_key"`
	} `toml:"dynamodb_store"`
}
