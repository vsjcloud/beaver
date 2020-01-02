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
import {PhotoUploader, UploaderPhoto} from "../../../photouploader/PhotoUploader";

export type ProjectFeaturePhotoProps = PropsWithRegisterField<{
  initialValue?: ProjectPhoto;
  initialPhotos: jspb.Map<string, Photo>;
  onChange(newValue?: ProjectPhoto): void;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
}>;

export function ProjectFeaturePhotoField({
  initialValue,
  initialPhotos,
  onChange,
  onUploadPhoto,
  registerField = Utils.identity,
}: ProjectFeaturePhotoProps): React.ReactElement {
  const [featurePhoto, setFeaturePhoto] = registerField(React.useState(
    new FormField(
      PhotoUtils.projectPhotosToUploaderPhotos(initialPhotos, initialValue ? [initialValue] : []),
      [
        new UploaderPhotosRequiredRule("Bạn cần chọn ảnh đại diện của dự án"),
      ],
    ),
  ));

  React.useEffect(function () {
    const photos = featurePhoto.getValue();
    onChange(photos.length > 0 ? PhotoUtils.uploaderPhotoToProjectPhoto(photos[0]) : undefined);
  }, [onChange, featurePhoto]);

  return (
    <FormGroup
      label="Ảnh đại diện của dự án"
      labelFor="project-feature-photo"
      labelInfo="(bắt buộc)"
      intent={featurePhoto.intent()}
      helperText={featurePhoto.message()}
    >
      <PhotoUploader
        id="project-feature-photo"
        multiple={false}
        photos={featurePhoto.getValue()}
        onUpdatePhotos={(newPhotos): void => setFeaturePhoto(featurePhoto => featurePhoto.setValue(newPhotos))}
        onUploadPhoto={onUploadPhoto}
        intent={featurePhoto.intent()}
      />
    </FormGroup>
  );
}
