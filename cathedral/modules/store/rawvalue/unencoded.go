package rawvalue

import (
	"github.com/jinzhu/copier"
	"github.com/mohae/deepcopy"
)

type UnencodedRawValue struct {
	value interface{}
}

func (v *UnencodedRawValue) Decode(out interface{}) error {
	return copier.Copy(out, v.value)
}

func InterfaceToUnencodedRawValue(value interface{}) *UnencodedRawValue {
	return &UnencodedRawValue{
		value: deepcopy.Copy(value),
	}
}
