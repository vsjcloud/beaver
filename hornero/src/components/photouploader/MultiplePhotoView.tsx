import {Button, Intent} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import produce from "immer";
import React from "react";
import {DragDropContext, Droppable, DroppableProvided, DropResult} from "react-beautiful-dnd";

import {PhotoCard} from "./PhotoCard";
import {UploaderPhoto} from "./PhotoUploader";

export type MultiplePhotoViewProps = {
  photos: UploaderPhoto[];
  onUpdatePhotos(photos: UploaderPhoto[]): void;
  onShowUpload(): void;
  onOpenViewPhotoDialog(photo: UploaderPhoto): void;
  onOpenEditPhotoDialog(photo: UploaderPhoto): void;
  onDeletePhoto(photoID: string): void;
};

export function MultiplePhotoView({
  photos,
  onUpdatePhotos,
  onShowUpload,
  onOpenViewPhotoDialog,
  onOpenEditPhotoDialog,
  onDeletePhoto,
}: MultiplePhotoViewProps): React.ReactElement {
  function onDragEnd(result: DropResult): void {
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextPhotos = produce(photos, draft => {
      const [removed] = draft.splice(startIndex, 1);
      draft.splice(endIndex, 0, removed);
    });
    onUpdatePhotos(nextPhotos);
  }

  const photoCards = photos.map((photo, index) => {
    return (
      <PhotoCard
        key={photo.id}
        photo={photo}
        index={index}
        onViewPhoto={(): void => onOpenViewPhotoDialog(photo)}
        onOpenEditPhotoDialog={(): void => onOpenEditPhotoDialog(photo)}
        onDeletePhoto={(): void => onDeletePhoto(photo.id)}
      />
    )
  });

  return (
    <React.Fragment>
      <div className="flex flex-row justify-between">
        <div className="font-bold text-lg text-blue-3">{photos.length} đã được chọn</div>
        <Button icon={IconNames.CLOUD_UPLOAD} intent={Intent.PRIMARY} onClick={onShowUpload}>Thêm ảnh</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="photosDroppable">
          {(provided: DroppableProvided): React.ReactElement<HTMLElement> => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mt-2"
              style={{minHeight: "360px"}}
            >
              {photoCards}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  )
}
