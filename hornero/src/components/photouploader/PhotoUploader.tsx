import {Card} from "@blueprintjs/core";
import React from "react";

import {PhotoListView} from "./PhotoListView";
import {UploadView} from "./UploadView";

import {PhotoAndID} from "../../generated/proto/model/photo_pb";

export const MIN_HEIGHT = "400px";

export interface UploaderPhoto {
  id: string;
  name: string;
  description: string;
  previewSet: string;
  preview: string;
}

export type PhotoUploaderProps = {
  id: string;
  multiple: boolean;
  photos: UploaderPhoto[];
  onUpdatePhotos(photos: UploaderPhoto[]): void;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
};

export function PhotoUploader({
  id,
  multiple,
  photos,
  onUpdatePhotos,
  onUploadPhoto,
}: PhotoUploaderProps): React.ReactElement {
  const [showUpload, setShowUpload] = React.useState(false);

  return (
    <Card style={{minHeight: MIN_HEIGHT}}>
      {showUpload || photos.length === 0 ?
        <UploadView
          id={id}
          multiple={multiple}
          photos={photos}
          onUploadPhoto={onUploadPhoto}
          onUpdatePhotos={onUpdatePhotos}
          onClose={photos.length !== 0 ? ((): void => setShowUpload(false)) : undefined}
        /> :
        <PhotoListView
          multiple={multiple}
          photos={photos}
          onUpdatePhotos={onUpdatePhotos}
          onShowUpload={(): void => setShowUpload(true)}
        />
      }
    </Card>
  );
}
