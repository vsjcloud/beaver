import * as Config from "../config";
import {Photo} from "../generated/proto/model/photo_pb";

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
