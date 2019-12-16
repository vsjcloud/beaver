package rawvalue

type RawValue interface {
	Decode(out interface{}) error
}
