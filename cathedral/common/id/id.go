package id

const (
	ProjectPartition                     = "prj"
	ProjectTagPartition                  = "prt"
	ProjectSwapPartition                 = "swp"
	ArchivedProjectDirectoryPartition    = "archivedProjectDirectory"
	ArchivedProjectTagDirectoryPartition = "archivedProjectTagDirectory"

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

func GenerateProjectTagID() ID {
	return ID{
		Partition: ProjectTagPartition,
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

var ArchivedProjectDirectoryID = ID{
	Partition: ArchivedProjectDirectoryPartition,
	Sort:      StaticSort,
}

var ArchivedProjectTagDirectoryID = ID{
	Partition: ArchivedProjectTagDirectoryPartition,
	Sort:      StaticSort,
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
