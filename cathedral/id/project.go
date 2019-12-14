package id

import (
	"github.com/vsjcloud/beaver/cathedral/modules/store"
)

func GenerateProjectID() string {
	return generateIDWithPrefix(ProjectIDPrefix)
}

func ProjectIDStore(projectID string) store.ID {
	return store.ID{
		Partition: ProjectIDPrefix,
		Sort:      projectID[len(ProjectIDPrefix):],
	}
}
