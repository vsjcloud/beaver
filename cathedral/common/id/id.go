package id

const (
	ProjectPartition     = "prj"
	ProjectSwapPartition = "swp"

	PhotoPartition           = "pht"
	PhotoResolutionPartition = "res"

	StaticSort = "s"
)

type ID struct {
	Partition string
	Sort      string
}

func (id ID) String() string {
	return id.Partition + "." + id.Sort
}

func GenerateProjectID() ID {
	return ID{
		Partition: ProjectPartition,
		Sort:      generateID(),
	}
}

func IsProjectID(projectID ID) bool {
	return projectID.Partition == ProjectPartition
}

func ProjectSwapID(projectID ID) ID {
	return ID{
		Partition: ID{
			Partition: projectID.String(),
			Sort:      ProjectSwapPartition,
		}.String(),
		Sort: StaticSort,
	}
}

func IsProjectSwapID(swapID ID) bool {
	partitionID := ParseID(swapID.Partition)
	return partitionID.Sort == ProjectSwapPartition && IsProjectID(ParseID(partitionID.Partition))
}

func GeneratePhotoID() ID {
	return ID{
		Partition: PhotoPartition,
		Sort:      generateID(),
	}
}

func IsPhotoID(photoID ID) bool {
	return photoID.Partition == PhotoPartition
}

func GeneratePhotoResolutionID(photoID ID) ID {
	return ID{
		Partition: ID{
			Partition: photoID.String(),
			Sort:      PhotoResolutionPartition,
		}.String(),
		Sort: generateID(),
	}
}

func IsPhotoResolutionID(resolutionID ID) bool {
	partitionID := ParseID(resolutionID.Partition)
	return partitionID.Sort == PhotoResolutionPartition && IsPhotoID(ParseID(partitionID.Partition))
}
