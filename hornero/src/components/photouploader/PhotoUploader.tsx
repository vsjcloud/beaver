import {
  Button,
  ButtonGroup,
  Card,
  Classes,
  Elevation,
  Icon,
  Intent,
  Menu,
  NonIdealState,
  Popover,
  Position,
} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import produce from "immer";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";

import EditPhotoDialog from "./EditPhotoDialog";

export interface Photo {
  id: string;
  name: string;
  description: string;
  preview: string;
}

export interface PhotoUploaderProps {
  multiple: boolean;
  photos: Photo[];
  onUpdatePhotos: (photos: Photo[]) => void;
}

export interface PhotoUploaderState {
  editPhoto?: Photo;
}

export default class PhotoUploader extends React.PureComponent<PhotoUploaderProps, PhotoUploaderState> {
  public state: PhotoUploaderState = {
    editPhoto: undefined,
  };

  private static renderUploadButton(): React.ReactElement {
    return (
      <Button icon={IconNames.CLOUD_UPLOAD} intent={Intent.PRIMARY}>Chọn ảnh</Button>
    );
  }

  private static renderNonIdeaState(): React.ReactNode {
    return (
      <div style={{height: "400px"}}>
        <NonIdealState
          icon={IconNames.CLOUD_UPLOAD}
          title="Chưa có ảnh"
          description="Tải ảnh lên từ thiết bị của bạn"
          action={this.renderUploadButton()}
        />
      </div>
    );
  }

  public render(): React.ReactNode {
    const {photos} = this.props;
    return (
      <Card elevation={Elevation.ONE} style={{minHeight: "400px"}}>
        {photos.length === 0
          ? PhotoUploader.renderNonIdeaState()
          : this.renderNormalState()
        }
        <EditPhotoDialog onClose={this.onCloseEditPhotoDialog} photo={this.state.editPhoto}
          onSubmit={this.onUpdatePhoto}/>
      </Card>
    );
  }

  private renderNormalState(): React.ReactNode {
    return (
      <div style={{minHeight: "400px"}}>
        {this.renderToolbar()}
        {this.props.multiple ? this.renderMultiplePhotos() : this.renderSinglePhoto()}
      </div>
    );
  }

  private renderToolbar(): React.ReactNode {
    const {photos, multiple} = this.props;
    return (
      <div className="flex flex-row justify-between items-center">
        <div className="font-bold text-lg text-blue-3">{photos.length} ảnh được chọn</div>
        {multiple ?
          (
            <Button icon={IconNames.CLOUD_UPLOAD} intent={Intent.PRIMARY}>Thêm ảnh</Button>
          ) : (
            <Button onClick={this.onDeletePhoto(photos[0].id)} icon={IconNames.DELETE} intent={Intent.DANGER}>Xóa ảnh</Button>
          )}
      </div>
    );
  }

  private onUpdatePhoto = (newPhoto: Photo): void => {
    const nextPhotos = produce(this.props.photos, draft => {
      const index = draft.findIndex(photo => photo.id === newPhoto.id);
      if (index >= 0) {
        draft[index] = newPhoto;
      }
    });
    this.props.onUpdatePhotos(nextPhotos);
  };

  private onDeletePhoto = (photoID: string): (() => void) => {
    return (): void => {
      const nextPhotos = produce(this.props.photos, draft => {
        const index = draft.findIndex(photo => photo.id === photoID);
        draft.splice(index, 1);
      });
      this.props.onUpdatePhotos(nextPhotos);
    };
  };

  private onOpenEditPhotoDialog(editPhoto: Photo): () => void {
    return (): void => this.setState({editPhoto: editPhoto});
  }

  private onCloseEditPhotoDialog = (): void => this.setState({editPhoto: undefined});

  private renderSinglePhoto(): React.ReactElement {
    const photo = this.props.photos[0];
    return (
      <div className="mt-3">
        <img style={{height: "300px"}} className="block max-w-full max-h-full m-auto" src={photo.preview}
          alt={photo.description}/>
        <div className="mt-3 flex justify-center">
          <ButtonGroup>
            <Button icon={IconNames.ZOOM_IN}>Xem ảnh</Button>
            <Button icon={IconNames.EDIT} onClick={this.onOpenEditPhotoDialog(photo)}>Sửa nội dung</Button>
          </ButtonGroup>
        </div>
        <div className="mt-3">
          <div className="font-bold text-center">{photo.name}</div>
          <div
            className={classNames("mt-1 italic text-center", photo.description || "text-gray-3")}>{photo.description || "Nội dung của ảnh"}</div>
        </div>
      </div>
    );
  }

  private renderPhotoCard = (photo: Photo, index: number): React.ReactNode => {
    return (
      <Draggable key={photo.id} draggableId={photo.id} index={index}>
        {(provided: DraggableProvided): React.ReactElement<HTMLElement> => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="flex flex-row border border-light-gray-1 items-center justify-between px-1 py-3 mb-2 rounded bg-light-gray-5"
          >
            <div className="flex flex-row items-center">
              <Icon className="ml-1 mr-2" icon={IconNames.DRAG_HANDLE_VERTICAL} intent={Intent.PRIMARY}/>
              <img src={photo.preview} className={Classes.ELEVATION_0} style={{width: "60px", height: "60px"}}
                alt={photo.description}/>
              <div className="ml-2">
                <div className="font-bold">{photo.name}</div>
                <div
                  className={classNames("italic", photo.description || "text-gray-3")}>{photo.description || "Nội dung của ảnh"}</div>
              </div>
            </div>
            <Popover position={Position.RIGHT}>
              <Button className="mr-2" icon={IconNames.MENU} minimal={true}/>
              <Menu>
                <Menu.Item icon={IconNames.ZOOM_IN} text="Xem ảnh"/>
                <Menu.Item icon={IconNames.EDIT} onClick={this.onOpenEditPhotoDialog(photo)} text="Sửa nội dung"/>
                <Menu.Item onClick={this.onDeletePhoto(photo.id)} icon={IconNames.DELETE} intent={Intent.DANGER} text="Xóa ảnh"/>
              </Menu>
            </Popover>
          </div>
        )}
      </Draggable>
    );
  };

  private onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }
    const {photos, onUpdatePhotos} = this.props;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const nextPhotos = produce(photos, draft => {
      const [removed] = draft.splice(startIndex, 1);
      draft.splice(endIndex, 0, removed);
    });
    onUpdatePhotos(nextPhotos);
  };

  private renderMultiplePhotos(): React.ReactElement {
    const photoCards = this.props.photos.map(this.renderPhotoCard);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
    );
  }
}
