import {Card, Intent} from "@blueprintjs/core";
import React from "react";

import {PhotoListView} from "./PhotoListView";
import {UploadView} from "./UploadView";

import {PhotoAndID} from "../../generated/proto/model/photo_pb";

export const MIN_HEIGHT = "500px";

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
  intent?: Intent;
  onUpdatePhotos(photos: UploaderPhoto[]): void;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
};

export function PhotoUploader({
  id,
  multiple,
  photos,
  intent,
  onUpdatePhotos,
  onUploadPhoto,
}: PhotoUploaderProps): React.ReactElement {
  const [showUpload, setShowUpload] = React.useState(false);

  function onUploadUpdatePhotos(photos: UploaderPhoto[]): void {
    onUpdatePhotos(photos);
    setShowUpload(false);
  }

  function intentClasses(): string {
    switch (intent) {
    case Intent.PRIMARY:
      return "border border-blue-3";
    case Intent.SUCCESS:
      return "border border-green-3";
    case Intent.WARNING:
      return "border border-orange-3";
    case Intent.DANGER:
      return "border border-red-3";
    }
    return "";
  }

  return (
    <Card className={intentClasses()} style={{minHeight: MIN_HEIGHT}}>
      {showUpload || photos.length === 0 ?
        <UploadView
          id={id}
          multiple={multiple}
          photos={photos}
          onUploadPhoto={onUploadPhoto}
          onUpdatePhotos={onUploadUpdatePhotos}
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
