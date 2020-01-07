import * as Config from "../config";
import {Photo} from "../generated/proto/model/photo_pb";

export function getPhotoURLByResolutionID(resolutionID: string): string {
  return `https://s3-${Config.PHOTO_AWS_REGION}.amazonaws.com/${Config.PHOTO_S3_BUCKET}/${resolutionID}`;
}

export function getPhotoURLFromPhotoModel(photo?: Photo.AsObject): string {
  if (!photo || photo.resolutionsMap.length === 0) {
    return "";
  }
  return getPhotoURLByResolutionID(photo.resolutionsMap.entries().next().value[1][0]);
}

export function getPhotoURLSetFromPhotoModel(photo?: Photo.AsObject): string {
  const res: string[] = [];
  photo?.resolutionsMap.forEach(([resolutionID, resolution]) =>
    res.push(`${getPhotoURLByResolutionID(resolutionID)} ${resolution.width}w`));
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
