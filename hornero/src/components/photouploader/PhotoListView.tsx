import produce from "immer";
import React from "react";

import {EditPhotoDialog} from "./EditPhotoDialog";
import {MultiplePhotoView} from "./MultiplePhotoView";
import {MIN_HEIGHT, UploaderPhoto} from "./PhotoUploader";
import {SinglePhotoView} from "./SinglePhotoView";
import {ViewPhotoDialog} from "./ViewPhotoDialog";

export type PhotoListFrameProps = {
  multiple: boolean;
  photos: UploaderPhoto[];
  onUpdatePhotos(photos: UploaderPhoto[]): void;
  onShowUpload(): void;
};

export function PhotoListView({multiple, photos, onUpdatePhotos, onShowUpload}: PhotoListFrameProps): React.ReactElement {
  const [editPhoto, setEditPhoto] = React.useState<UploaderPhoto>();
  const [viewPhoto, setViewPhoto] = React.useState<UploaderPhoto>();

  function onUpdatePhoto(newPhoto: UploaderPhoto): void {
    onUpdatePhotos(produce(photos, draft => {
      const index = draft.findIndex(photo => photo.id === newPhoto.id);
      if (index >= 0) {
        draft[index] = newPhoto;
      }
    }));
  }

  function onDeletePhoto(photoID: string): void {
    onUpdatePhotos(produce(photos, draft => {
      const index = draft.findIndex(photo => photo.id === photoID);
      if (index === -1) {
        return;
      }
      draft.splice(index, 1);
    }));
  }

  function onSubmitEditPhotoDialog(photo: UploaderPhoto): void {
    onUpdatePhoto(photo);
    setEditPhoto(undefined);
  }

  function singlePhotoOnDelete(): void {
    onDeletePhoto(photos[0].id);
    onShowUpload();
  }

  return (
    <div style={{minHeight: MIN_HEIGHT}}>
      {multiple ? (
        <MultiplePhotoView
          photos={photos}
          onShowUpload={onShowUpload}
          onUpdatePhotos={onUpdatePhotos}
          onOpenViewPhotoDialog={setViewPhoto}
          onOpenEditPhotoDialog={setEditPhoto}
          onDeletePhoto={onDeletePhoto}
        />
      ) : (
        <SinglePhotoView
          photo={photos[0]}
          onDeletePhoto={singlePhotoOnDelete}
          onOpenViewPhotoDialog={(): void => setViewPhoto(photos[0])}
          onOpenEditPhotoDialog={(): void => setEditPhoto(photos[0])}
        />
      )}
      <EditPhotoDialog
        photo={editPhoto}
        onClose={(): void => setEditPhoto(undefined)}
        onSubmit={onSubmitEditPhotoDialog}
      />
      <ViewPhotoDialog
        photo={viewPhoto}
        onClose={(): void => setViewPhoto(undefined)}
      />
    </div>
  );
}
