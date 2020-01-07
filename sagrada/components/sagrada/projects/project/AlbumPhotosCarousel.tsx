import Carousel from "nuka-carousel";
import React from "react";

import {AlbumPhotoCard, AlbumPhotoCardInfo} from "./AlbumPhotoCard";

import {Photo} from "../../../../common/generated/proto/model/photo_pb";
import {ProjectPhoto} from "../../../../common/generated/proto/model/project_pb";
import * as PhotoUtils from "../../../../common/utils/photo";


export type AlbumPhotosCarouselProps = {
  albumPhotos: ProjectPhoto.AsObject[];
  photos: Map<string, Photo.AsObject>;
  className?: string;
};

export function AlbumPhotoCarousel({albumPhotos, photos, className}: AlbumPhotosCarouselProps): React.ReactElement {
  const photoCards = albumPhotos.map((projectPhoto) => {
    const photo = photos.get(projectPhoto.photoid);
    const cardInfo: AlbumPhotoCardInfo = {
      preview: PhotoUtils.getPhotoURLFromPhotoModel(photo),
      previewSet: PhotoUtils.getPhotoURLSetFromPhotoModel(photo),
      description: projectPhoto.description,
    };
    return (
      <AlbumPhotoCard
        key={projectPhoto.photoid}
        info={cardInfo}
      />
    );
  });

  return (
    <React.Fragment>
      <Carousel className={className}>
        {photoCards}
      </Carousel>
    </React.Fragment>
  );
}
