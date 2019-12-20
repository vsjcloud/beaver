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

func ProjectSwapID(projectID ID) ID {
	return ID{
		Partition: ID{
			Partition: projectID.String(),
			Sort:      ProjectSwapPartition,
		}.String(),
		Sort: StaticSort,
	}
}

func GeneratePhotoID() ID {
	return ID{
		Partition: PhotoPartition,
		Sort:      generateID(),
	}
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
