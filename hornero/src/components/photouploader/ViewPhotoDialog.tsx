import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import {Classes, Dialog} from "@blueprintjs/core";
import React from "react";

import {UploaderPhoto} from "./PhotoUploader";

export type ViewPhotoDialogProps = {
  photo?: UploaderPhoto;
  onClose(): void;
};

// TODO: update photo preview
export function ViewPhotoDialog({photo, onClose}: ViewPhotoDialogProps): React.ReactElement {
  return (
    <Dialog
      icon={IconNames.ZOOM_IN}
      isOpen={!!photo}
      onClose={onClose}
      title={photo?.name}
      style={{maxHeight: "900px", maxWidth: "1200px", width: "auto", minWidth: "500px"}}
    >
      <div className={Classes.DIALOG_BODY}>
        <img className={classNames("block mx-auto", Classes.ELEVATION_1)} src={photo?.preview || ""} alt={photo?.description || ""}/>
      </div>
    </Dialog>
  )
}
