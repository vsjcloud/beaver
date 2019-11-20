// eslint-disable-next-line import/no-named-as-default
import produce from "immer";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";

import {Intent} from "../../../base/core/common/intent";
import Button from "../../../base/core/components/button/Button";
import {Icon} from "../../../base/core/components/icon/Icon";
import {resolveProperties, Value} from "../../../base/core/style";
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
      <div
        className={resolveProperties({
          border: Value.Border.All,
          borderColor: Value.BorderColor.Gray3,
          backgroundColor: Value.BackgroundColor.White,
          borderRadius: Value.BorderRadius.Px2,
          display: Value.Display.Flex,
          flexDirection: Value.FlexDirection.Col,
        })}
        style={{minHeight: "400px"}}
      >
        {this.renderToolbar()}
        {this.renderPhotos()}
      </div>
    );
  }

  private renderToolbar(): React.ReactNode {
    const {photos} = this.props;

    return (
      <div
        className={resolveProperties({
          display: Value.Display.Flex,
          paddingX: Value.PaddingX.Px8,
          paddingTop: Value.PaddingTop.Px8,
        })}
      >
        <div
          className={resolveProperties({
            flexGrow: Value.FlexGrow.One,
            alignSelf: Value.AlignSelf.Center,
            fontWeight: Value.FontWeight.Bold,
            textColor: Value.TextColor.Blue5,
            fontSize: Value.FontSize.Px20,
          })}
        >{photos.length} ảnh</div>
        <Button intent={Intent.Primary} icon={IconName.Add}>Thêm ảnh</Button>
      </div>
    );
  }

  private renderPhotoCard(photo: Photo, index: number): React.ReactNode {
    return (
      <Draggable key={photo.id} draggableId={photo.id} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot): React.ReactElement<HTMLElement> => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={resolveProperties({
              display: Value.Display.Flex,
              flexDirection: Value.FlexDirection.Row,
              border: Value.Border.All,
              borderColor: Value.BorderColor.Gray3,
              backgroundColor: Value.BackgroundColor.Gray1,
              marginBottom: Value.MarginBottom.Px8,
              borderRadius: Value.BorderRadius.Px2,
            })}
          >
            <div
              className={resolveProperties({
                display: Value.Display.Flex,
                flexDirection: Value.FlexDirection.Row,
                paddingY: Value.PaddingY.Px8,
              })}
            >
              <div
                className={resolveProperties({
                  display: Value.Display.Flex,
                  alignItems: Value.AlignItems.Center,
                  marginX: Value.MarginX.Px8,
                })}
              >
                <Icon intent={Intent.Primary} icon={IconName.DragHandleVertical}/>
              </div>
              <div
                className={resolveProperties({
                  display: Value.Display.Flex,
                  shadow: Value.Shadow.Px1Dark,
                })}
              >
                <img src={photo.preview} style={{height: "60px", width: "60px"}} alt="thumbnail"/>
              </div>
              <div
                className={resolveProperties({
                  display: Value.Display.Flex,
                  flexDirection: Value.FlexDirection.Col,
                  fontSize: Value.FontSize.Px15,
                  marginLeft: Value.MarginLeft.Px8,
                })}
              >
                <div>{photo.name}</div>
                <div>{photo.description}</div>
              </div>
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
              className={resolveProperties({
                display: Value.Display.Flex,
                flex: Value.Flex.One,
                flexDirection: Value.FlexDirection.Col,
                paddingX: Value.PaddingX.Px8,
                marginTop: Value.MarginTop.Px8,
              })}
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
