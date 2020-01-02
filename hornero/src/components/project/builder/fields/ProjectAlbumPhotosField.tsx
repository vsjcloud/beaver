import {FormGroup} from "@blueprintjs/core";
import * as jspb from "google-protobuf";
import React from "react";

import {FormField} from "../../../../core/form/formField";
import {PropsWithRegisterField} from "../../../../core/form/formValidator";
import {UploaderPhotosRequiredRule} from "../../../../core/form/rules";
import {Photo, PhotoAndID} from "../../../../generated/proto/model/photo_pb";
import {ProjectPhoto} from "../../../../generated/proto/model/project_pb";
import * as Utils from "../../../../utils";
import * as PhotoUtils from "../../../../utils/photo";
import {PhotoUploader} from "../../../photouploader/PhotoUploader";

export type ProjectAlbumPhotosFieldProps = PropsWithRegisterField<{
  initialValue: ProjectPhoto[];
  initialPhotos: jspb.Map<string, Photo>;
  onChange(photos: ProjectPhoto[]): void;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
}>;

export function ProjectAlbumPhotosField({
  initialValue,
  initialPhotos,
  onChange,
  onUploadPhoto,
  registerField = Utils.identity,
}: ProjectAlbumPhotosFieldProps): React.ReactElement {
  const [albumPhotos, setAlbumPhotos] = registerField(
    React.useState(
      new FormField(
        PhotoUtils.projectPhotosToUploaderPhotos(initialPhotos, initialValue), [
          new UploaderPhotosRequiredRule("Bạn cần chọn ít nhất 1 ảnh dự án"),
        ],
      ),
    ),
  );

  React.useEffect(function () {
    const photos = albumPhotos.getValue();
    onChange(photos.map(PhotoUtils.uploaderPhotoToProjectPhoto));
  }, [onChange, albumPhotos]);

  return (
    <FormGroup
      label="Ảnh dự án"
      labelFor="project-album-photos"
      labelInfo="(bắt buộc)"
      intent={albumPhotos.intent()}
      helperText={albumPhotos.message()}
    >
      <PhotoUploader
        id="project-album-photos"
        multiple={true}
        photos={albumPhotos.getValue()}
        onUpdatePhotos={(newPhotos): void => setAlbumPhotos(albumPhotos => albumPhotos.setValue(newPhotos))}
        onUploadPhoto={onUploadPhoto}
        intent={albumPhotos.intent()}
      />
    </FormGroup>
  );
}
