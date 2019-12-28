import {FormGroup, InputGroup} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import React from "react";
import * as jspb from "google-protobuf";

import {Photo, PhotoAndID} from "../../generated/proto/model/photo_pb";
import * as Utils from "../../utils";
import * as PhotoUtils from "../../utils/photo";
import {FormField} from "../../core/form/field";
import {RequiredRule} from "../../core/form/rules";
import {Project, ProjectPhoto} from "../../generated/proto/model/project_pb";
import {UploaderPhoto, PhotoUploader} from "../photouploader/PhotoUploader";

export type ProjectBuilderProps = {
  project: Project;
  photos: jspb.Map<string, Photo>;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
};

function projectPhotosToUploaderPhotos(photos: jspb.Map<string, Photo>, projectPhotos: ProjectPhoto[]): UploaderPhoto[] {
  return projectPhotos.map((projectPhoto) => {
    const photoModel = photos.get(projectPhoto.getPhotoid())!;
    return {
      id: projectPhoto.getPhotoid(),
      name: photoModel.getName(),
      description: projectPhoto.getDescription(),
      previewSet: PhotoUtils.getPhotoURLSetFromPhotoModel(photoModel),
      preview: PhotoUtils.getPhotoURLFromPhotoModel(photoModel),
    };
  });
}

function projectPhotoToUploaderPhotos(photos: jspb.Map<string, Photo>, projectPhoto?: ProjectPhoto): UploaderPhoto[] {
  if (projectPhoto) {
    return projectPhotosToUploaderPhotos(photos, [projectPhoto]);
  }
  return projectPhotosToUploaderPhotos(photos, []);
}

export function ProjectBuilder({project, photos, onUploadPhoto}: ProjectBuilderProps): React.ReactElement {
  const [name, setName] = React.useState(new FormField(project.getName(), [
    new RequiredRule("Tên dự án không được để trống"),
  ]));
  const [description, setDescription] = React.useState(new FormField(project.getDescription(), []));
  // const [featurePhoto, setFeaturePhoto] = React.useState(projectPhotoToUploaderPhotos(photos, project.getFeaturephoto()));
  // const [albumPhotos, setAlbumPhotos] = React.useState(projectPhotosToUploaderPhotos(photos, project.getAlbumphotosList()));

  const [featurePhoto, setFeaturePhoto] = React.useState<UploaderPhoto[]>([
    {
      id: "photo_1",
      name: "photo.jpg",
      description: "",
      previewSet: "",
      preview: "https://picsum.photos/200/300",
    },
  ]);
  const [albumPhotos, setAlbumPhotos] = React.useState<UploaderPhoto[]>([
    {
      id: "photo_1",
      name: "photo1.jpg",
      description: "",
      previewSet: "",
      preview: "https://picsum.photos/200/300",
    },
    {
      id: "photo_2",
      name: "photo2.jpg",
      description: "",
      previewSet: "",
      preview: "https://picsum.photos/300/300",
    },
    {
      id: "photo_3",
      name: "photo3.jpg",
      description: "",
      previewSet: "",
      preview: "https://picsum.photos/300/200",
    },
  ]);

  return (
    <React.Fragment>
      <FormGroup
        label="Tên dự án"
        labelFor="project-name"
        labelInfo="(bắt buộc)"
        intent={name.intent()}
        helperText={name.failureMessage()}
      >
        <InputGroup
          id="project-name"
          value={name.getValue()}
          onChange={Utils.onStringChange((newValue) => setName(name.updateValue(newValue)))}
          intent={name.intent()}
          placeholder="Nhập tên của dự án..."
        />
      </FormGroup>
      <FormGroup
        label="Giới thiệu về dự án"
        labelFor="project-description"
        intent={description.intent()}
        helperText={description.failureMessage()}
      >
        <InputGroup
          id="project-description"
          value={description.getValue()}
          onChange={Utils.onStringChange((newValue) => setDescription(description.updateValue(newValue)))}
          intent={description.intent()}
          placeholder="Giới thiệu về dự án..."
        />
      </FormGroup>
      <FormGroup
        label="Ảnh đại diện của dự án"
        labelFor="project-feature-photo"
        labelInfo="(bắt buộc)"
      >
        <PhotoUploader
          id="project-feature-photo"
          multiple={false}
          photos={featurePhoto}
          onUpdatePhotos={setFeaturePhoto}
          onUploadPhoto={onUploadPhoto}
        />
      </FormGroup>
      <FormGroup
        label="Ảnh dự án"
        labelFor="project-album-photos"
        labelInfo="(bắt buộc)"
      >
        <PhotoUploader
          id="project-album-photos"
          multiple={true}
          photos={albumPhotos}
          onUpdatePhotos={setAlbumPhotos}
          onUploadPhoto={onUploadPhoto}
        />
      </FormGroup>
    </React.Fragment>
  );
}
