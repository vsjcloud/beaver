// eslint-disable-next-line import/no-named-as-default
import produce from "immer";
import React from "react";
import {
  DragDropContext,
  Draggable, DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";

import {Intent} from "../../../base/core/common/intent";
import Button from "../../../base/core/components/button/Button";
import {Icon} from "../../../base/core/components/icon/Icon";
import {IconName} from "../../../base/icons";

export interface Photo {
  id: string;
  name: string;
  description?: string;
  preview: string;
}

export interface PhotoUploaderProps {
  photos: Photo[];
  onUpdatePhotos: (photos: Photo[]) => void;
}

export class PhotoUploader extends React.PureComponent<PhotoUploaderProps, {}> {
  public render(): React.ReactNode {
    return (
      <div className="bg-light-gray-4 shadow-elevation-1 rounded flex flex-col" style={{minHeight: "400px"}}>
        {this.renderToolbar()}
        {this.renderPhotos()}
      </div>
    );
  }

  private renderToolbar(): React.ReactNode {
    const {photos} = this.props;

    return (
      <div className="flex">
        <div className="flex-grow">{photos.length} ảnh</div>
        <div>
          <Button/>
        </div>
      </div>
    );
  }

  private renderPhotoCard(photo: Photo, index: number): React.ReactNode {
    return (
      <Draggable key={photo.id} draggableId={photo.id} index={index}>
        {(provided: DraggableProvided): React.ReactElement<HTMLElement> => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="flex border-b border-gray-5 bg-white py-2"
          >
            <div className="flex items-center ml-2 mr-3">
              <Icon intent={Intent.Primary} icon={IconName.DragHandleVertical}/>
            </div>
            <div className="shadow-elevation-0">
              <img src={photo.preview} style={{height: "60px", width: "60px"}} alt="thumbnail"/>
            </div>
            <div>
              {photo.name}
              {photo.description}
            </div>
          </div>
        )}
      </Draggable>
    );
  }

  private onDragEnd = (result: DropResult): void => {
    // Item is dropped outside of the list
    if (!result.destination) {
      return;
    }

    const {photos, onUpdatePhotos} = this.props;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const nextPhotos = produce<Photo[]>(photos, draftPhotos => {
      const [removed] = draftPhotos.splice(startIndex, 1);
      draftPhotos.splice(endIndex, 0, removed);
    });

    onUpdatePhotos(nextPhotos);
  };

  private renderPhotos(): React.ReactNode {
    const {photos} = this.props;
    const photoCards = photos.map(this.renderPhotoCard);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="photosDroppable">
          {(provided: DroppableProvided): React.ReactElement<HTMLElement> => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-1 flex-col"
            >
              {photoCards}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
