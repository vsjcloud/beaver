import * as jspb from "google-protobuf";
import {UploaderPhoto} from "../components/photouploader/PhotoUploader";
import * as Config from "../config";
import {Photo} from "../generated/proto/model/photo_pb";
import {ProjectPhoto} from "../generated/proto/model/project_pb";

export function getPhotoURLByResolutionID(resolutionID: string): string {
  return `https://s3-${Config.PHOTO_AWS_REGION}.amazonaws.com/${Config.PHOTO_S3_BUCKET}/${resolutionID}`;
}

export function getPhotoURLFromPhotoModel(photo?: Photo): string {
  if (!photo || photo.getResolutionsMap().getLength() === 0) {
    return "";
  }
  return getPhotoURLByResolutionID(photo.getResolutionsMap().entries().next().value[0]);
}

export function getPhotoURLSetFromPhotoModel(photo?: Photo): string {
  const res: string[] = [];
  photo?.getResolutionsMap().forEach((resolution, resolutionID) =>
    res.push(`${getPhotoURLByResolutionID(resolutionID)} ${resolution.getWidth()}w`));
  return res.join(",");
}

export function getPhotoBestQualityURLFromURLSet(urlSet?: string): string {
  if (!urlSet) return "";
  const bestQuality = urlSet
    .split(",")
    .map(urlWithWidth => urlWithWidth.split(" "))
    .reduce((prev, current) => {
      return parseInt(prev[1]) > parseInt(current[1]) ? prev : current;
    });
  if (bestQuality.length === 0) return "";
  return bestQuality[0][0];
}

export function projectPhotosToUploaderPhotos(photos: jspb.Map<string, Photo>, projectPhotos: ProjectPhoto[]): UploaderPhoto[] {
  return projectPhotos.map((projectPhoto) => {
    const photoModel = photos.get(projectPhoto.getPhotoid())!;
    return {
      id: projectPhoto.getPhotoid(),
      name: photoModel.getName(),
      description: projectPhoto.getDescription(),
      previewSet: getPhotoURLSetFromPhotoModel(photoModel),
      preview: getPhotoURLFromPhotoModel(photoModel),
    };
  });
}

export function uploaderPhotoToProjectPhoto(uploaderPhoto: UploaderPhoto): ProjectPhoto {
  const projectPhoto = new ProjectPhoto();
  projectPhoto.setPhotoid(uploaderPhoto.id);
  projectPhoto.setDescription(uploaderPhoto.description);
  return projectPhoto;
}
