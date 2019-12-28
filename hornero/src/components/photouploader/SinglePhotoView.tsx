import {Button, ButtonGroup, Classes, Divider, Intent} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import React from "react";

import {UploaderPhoto} from "./PhotoUploader";

export type SinglePhotoFrameProps = {
  photo: UploaderPhoto;
  onDeletePhoto(): void;
  onOpenViewPhotoDialog(): void;
  onOpenEditPhotoDialog(): void;
};

export function SinglePhotoView({photo, onDeletePhoto, onOpenViewPhotoDialog, onOpenEditPhotoDialog}: SinglePhotoFrameProps): React.ReactElement {
  return (
    <React.Fragment>
      <ButtonGroup className="flex flex-row justify-end mb-3">
        <Button icon={IconNames.ZOOM_IN} onClick={onOpenViewPhotoDialog} minimal={true}>Xem ảnh</Button>
        <Divider/>
        <Button icon={IconNames.EDIT} onClick={onOpenEditPhotoDialog} minimal={true}>Sửa thông tin</Button>
        <Divider/>
        <Button onClick={onDeletePhoto} icon={IconNames.DELETE} intent={Intent.DANGER} minimal={true}>Xóa ảnh</Button>
      </ButtonGroup>
      <div>
        <img
          style={{height: "300px"}}
          className={classNames("block max-w-full max-h-full m-auto mb-3", Classes.ELEVATION_1)}
          src={photo.preview}
          srcSet={photo.previewSet}
          alt={photo.description}
        />
        <div>
          <div className="font-bold text-center mb-2">{photo.name}</div>
          <div
            className={classNames("italic text-center", photo.description || "text-gray-3")}
          >
            {photo.description || "Nội dung của ảnh"}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
