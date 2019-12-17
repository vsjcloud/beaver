package id

import (
	"github.com/vsjcloud/beaver/cathedral/modules/store"
	"log"
	"strings"
)

const (
	prefixLength = 3

	ProjectIDPrefix         = "prj"
	PhotoIDPrefix           = "pht"
	PhotoResolutionIDPrefix = "phr"
)

var prefixes = map[string]bool{
	ProjectIDPrefix:         true,
	PhotoIDPrefix:           true,
	PhotoResolutionIDPrefix: true,
}

func init() {
	for prefix := range prefixes {
		if len(prefix) != prefixLength {
			log.Panicf("prefix %s length is not %d\n", prefix, prefixLength)
		}
	}
}

func GenerateProjectID() string {
	return generateIDWithPrefix(ProjectIDPrefix)
}

func IsProjectID(projectID string) bool {
	return isIDPartWithPrefix(projectID, ProjectIDPrefix)
}

func GeneratePhotoID(parentID string) string {
	return concatID(parentID, generateIDWithPrefix(PhotoIDPrefix))
}

func IsPhotoID(photoID string) bool {
	parent := parentID(photoID)
	return IsID(parent) && isIDPartWithPrefix(photoID[len(parent)+1:], PhotoIDPrefix)
}

func GeneratePhotoResolutionID(parentID string) string {
	return concatID(parentID, generateIDWithPrefix(PhotoResolutionIDPrefix))
}

func IsPhotoResolutionID(resolutionID string) bool {
	parent := parentID(resolutionID)
	return IsPhotoID(parent) && isIDPartWithPrefix(resolutionID[len(parent)+1:], PhotoResolutionIDPrefix)
}

func isIDPartWithPrefix(part, prefix string) bool {
	if len(part) < len(prefix) {
		return false
	}
	if !strings.HasPrefix(part, prefix) {
		return false
	}
	if !isRandomPart(part[len(prefix):]) {
		return false
	}
	return true
}

func isIDPart(part string) bool {
	if len(part) < prefixLength {
		return false
	}
	if _, ok := prefixes[part[:prefixLength]]; !ok {
		return false
	}
	if !isRandomPart(part[prefixLength:]) {
		return false
	}
	return true
}

func IsID(id string) bool {
	if id == "" {
		return false
	}
	parts := strings.Split(id, ".")
	for _, part := range parts {
		if !isIDPart(part) {
			return false
		}
	}
	return true
}

func StringToStoreID(id string) (store.ID, error) {
	if id == "" {
		return store.ID{}, ErrCannotParseID
	}
	parts := strings.Split(id, ".")
	sum := 0
	for _, part := range parts {
		if !isIDPart(part) {
			return store.ID{}, ErrCannotParseID
		}
		sum += len(part)
	}
	partitionLen := prefixLength
	if len(parts) > 1 {
		partitionLen += sum + 1
	}
	return store.ID{
		Partition: id[:partitionLen],
		Sort:      id[partitionLen:],
	}, nil
}
