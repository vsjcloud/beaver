import {Button, Classes, Icon, Intent, Menu, Popover, Position} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import React from "react";
import {Draggable, DraggableProvided} from "react-beautiful-dnd";

import {UploaderPhoto} from "./PhotoUploader";

export type PhotoCardProps = {
  photo: UploaderPhoto;
  index: number;
  onViewPhoto(): void;
  onOpenEditPhotoDialog(): void;
  onDeletePhoto(): void;
};

export function PhotoCard({
  photo,
  index,
  onViewPhoto,
  onOpenEditPhotoDialog,
  onDeletePhoto,
}: PhotoCardProps): React.ReactElement {
  return (
    <Draggable draggableId={photo.id} index={index}>
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
              <Menu.Item icon={IconNames.ZOOM_IN} onClick={onViewPhoto} text="Xem ảnh"/>
              <Menu.Item icon={IconNames.EDIT} onClick={onOpenEditPhotoDialog} text="Sửa nội dung"/>
              <Menu.Item onClick={onDeletePhoto} icon={IconNames.DELETE} intent={Intent.DANGER} text="Xóa ảnh"/>
            </Menu>
          </Popover>
        </div>
      )}
    </Draggable>
  )
}
