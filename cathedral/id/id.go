package id

import (
	"crypto/rand"
	"encoding/binary"
	"encoding/hex"
	"fmt"
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"io"
	"strings"
	"sync/atomic"
	"time"
)

var objectIDCounter = readRandomUint32()
var processUnique = processUniqueBytes()

func processUniqueBytes() [5]byte {
	var b [5]byte
	_, err := io.ReadFull(rand.Reader, b[:])
	if err != nil {
		panic(fmt.Errorf("cannot initialize objectid package with crypto.rand.Reader: %v", err))
	}

	return b
}

func readRandomUint32() uint32 {
	var b [4]byte
	_, err := io.ReadFull(rand.Reader, b[:])
	if err != nil {
		panic(fmt.Errorf("cannot initialize objectid package with crypto.rand.Reader: %v", err))
	}

	return (uint32(b[0]) << 0) | (uint32(b[1]) << 8) | (uint32(b[2]) << 16) | (uint32(b[3]) << 24)
}

func putUint24(b []byte, v uint32) {
	b[0] = byte(v >> 16)
	b[1] = byte(v >> 8)
	b[2] = byte(v)
}

func generateIDFromTimestamp(timestamp time.Time) string {
	var b [12]byte

	binary.BigEndian.PutUint32(b[0:4], uint32(timestamp.Unix()))
	copy(b[4:9], processUnique[:])
	putUint24(b[9:12], atomic.AddUint32(&objectIDCounter, 1))

	return hex.EncodeToString(b[:])
}

func generateIDWithPrefix(prefix string) string {
	return prefix + generateIDFromTimestamp(time.Now())
}

func concatID(parent, child string) string {
	return parent + "." + child
}

func parentID(child string) string {
	p := strings.LastIndexByte(child, '.')
	if p == -1 {
		return ""
	}
	return child[:p]
}

func isRandomPart(s string) bool {
	if len(s)%2 != 0 {
		return false
	}
	for _, c := range s {
		if ('0' <= c && c <= '9') || ('a' <= c && c <= 'f') {
			continue
		}
		return false
	}
	return true
}

func StoreID(prefix string, id string) store.ID {
	parent := parentID(id)
	if parent == "" {
		return store.ID{
			Partition: prefix,
			Sort:      id[len(prefix):],
		}
	}
	return store.ID{
		Partition: parent + "." + prefix,
		Sort:      id[len(parent)+1+len(prefix):],
	}
}
