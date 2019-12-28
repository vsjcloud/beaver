import * as jspb from "google-protobuf";

import {Project} from "../generated/proto/model/project_pb";

export function updatePhotoSetWithProjectFeaturePhoto(photos: jspb.Map<string, boolean>, project: Project): void {
  const photo = project.getFeaturephoto();
  if (photo) {
    photos.set(photo.getPhotoid(), true);
  }
}

export function updatePhotoSetWithProjectPhotos(photos: jspb.Map<string, boolean>, project: Project): void {
  updatePhotoSetWithProjectFeaturePhoto(photos, project);
  for (const photo of project.getAlbumphotosList()) {
    photos.set(photo.getPhotoid(), true);
  }
}
