import {Button, NonIdealState, ProgressBar} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import produce from "immer";
import React from "react";

import {MIN_HEIGHT, UploaderPhoto} from "./PhotoUploader";

import {PhotoAndID} from "../../generated/proto/model/photo_pb";
import * as Config from "../../config";
import * as PhotoUtils from "../../utils/photo";
import {AppToaster} from "../toaster/AppToaster";

export type UploadFrameProps = {
  id: string;
  multiple: boolean;
  photos: UploaderPhoto[];
  onUpdatePhotos(photos: UploaderPhoto[]): void;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
  onClose?(): void;
};

export function UploadView({id, multiple, photos, onUpdatePhotos, onUploadPhoto, onClose}: UploadFrameProps): React.ReactElement {
  const [uploading, setUploading] = React.useState(false);
  const [percentage, setPercentage] = React.useState(100);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const inputEl = React.useRef<HTMLInputElement>(null);

  const uploadButton = (
    <Button icon={IconNames.CLOUD_UPLOAD} intent={Intent.PRIMARY} onClick={(): void => inputEl.current?.click()}>Chọn
      ảnh</Button>
  );

  async function onFilesChange(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!event.target.files) return;
    const filteredPhotos = Array.from(event.target.files).filter(function (photo: File): boolean {
      if (photo.size > Config.PHOTO_MAX_UPLOAD_SIZE) {
        AppToaster.show({
          message: `Dung lượng của ảnh ${photo.name} vượt quá giới hạn cho phép`,
          intent: Intent.DANGER,
        });
        return false;
      }
      return true;
    });
    if (filteredPhotos.length === 0) {
      if (inputEl.current) {
        inputEl.current.value = "";
      }
      if (photos.length === 0) {
        onUpdatePhotos(photos);
      }
      return;
    }
    setUploading(true);
    const newPhotos: UploaderPhoto[] = [];
    for (let i = 0; i < filteredPhotos.length; i++) {
      const photo = filteredPhotos[i];
      setPercentage((i + 1) / filteredPhotos.length);
      setTitle(`Tải lên ${i + 1}/${filteredPhotos.length} ảnh`);
      setDescription(`Đang tải lên ảnh ${photo.name}...`);
      try {
        const photoAndID = await onUploadPhoto(photo);
        newPhotos.push({
          id: photoAndID.getPhotoid(),
          name: photo.name,
          description: "",
          previewSet: PhotoUtils.getPhotoURLSetFromPhotoModel(photoAndID.getPhoto()),
          preview: PhotoUtils.getPhotoURLFromPhotoModel(photoAndID.getPhoto()),
        });
      } catch {
        AppToaster.show({
          intent: Intent.DANGER,
          message: `Có lỗi xảy ra khi tải lên ảnh ${photo.name}`,
        });
      }
    }
    onUpdatePhotos(produce(photos, draft => draft.concat(newPhotos)));
  }

  return (
    <div className="relative" style={{height: MIN_HEIGHT}}>
      {uploading ? (
        <NonIdealState
          icon={IconNames.CLOUD_UPLOAD}
          title={title}
          description={description}
          action={
            <ProgressBar intent={Intent.SUCCESS} value={percentage} className="mb-4"/>
          }
        />
      ) : (
        <React.Fragment>
          {onClose && (
            <div className="absolute right-0 top-0">
              <Button icon={IconNames.DELETE} intent={Intent.DANGER} onClick={onClose} minimal={true}>Đóng</Button>
            </div>
          )}
          <NonIdealState
            icon={IconNames.CLOUD_UPLOAD}
            title="Tải ảnh lên"
            description="Chọn ảnh từ thiết bị của bạn"
            action={uploadButton}
          />
          <input type="file" id={id} ref={inputEl} accept={"image/jpeg, image/png"} aria-hidden={true} hidden={true}
            multiple={multiple}
            tabIndex={-1} onChange={onFilesChange}/>
        </React.Fragment>
      )}
    </div>
  );
}
