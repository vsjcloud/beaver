import {Button, Classes, Dialog, FormGroup, InputGroup} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import produce from "immer";
import React from "react";

import {UploaderPhoto} from "./PhotoUploader";

import * as Utils from "../../utils";
import {FormField} from "../../core/form/field";
import {RequiredRule} from "../../core/form/rules";


export type EditPhotoDialogProps = {
  photo?: UploaderPhoto;
  onClose(): void;
  onSubmit(photo: UploaderPhoto): void;
};

export function EditPhotoDialog({photo, onClose, onSubmit}: EditPhotoDialogProps): React.ReactElement {
  const [name, setName] = React.useState(new FormField(photo?.name || "", [
    new RequiredRule("Tên ảnh không được để trống"),
  ]));
  const [description, setDescription] = React.useState(new FormField(photo?.description || "", []));

  React.useEffect(function () {
    if (!photo) return;
    setName(new FormField(photo.name, name.getRules()));
    setDescription(new FormField(photo.description, description.getRules()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo]);

  function validate(): boolean {
    return name.isSuccess() && description.isSuccess();
  }

  function onSave(): void {
    if (!photo) return;
    onSubmit(produce(photo, draft => {
      draft.name = name.getValue();
      draft.description = description.getValue();
    }));
  }

  return (
    <Dialog isOpen={!!photo} onClose={onClose} title="Sửa thông tin ảnh">
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="Tên ảnh"
          labelFor="photo-name"
          labelInfo="(bắt buộc)"
          helperText={name.failureMessage()}
          intent={name.intent()}
        >
          <InputGroup
            id="photo-name"
            placeholder="Nhập tên của ảnh..."
            value={name.getValue()}
            intent={name.intent()}
            disabled={true}
            onChange={Utils.onStringChange(newName => setName(name.updateValue(newName)))}/>
        </FormGroup>
        <FormGroup
          label="Nội dung ảnh"
          labelFor="photo-description"
          helperText={description.failureMessage()}
          intent={description.intent()}
        >
          <InputGroup
            id="photo-description"
            placeholder="Nhập nội dung của ảnh..."
            value={description.getValue()}
            intent={description.intent()}
            onChange={Utils.onStringChange(newDescription => setDescription(description.updateValue(newDescription)))}/>
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Đóng</Button>
          <Button onClick={onSave} intent={Intent.PRIMARY} disabled={!validate()}>Lưu thông tin</Button>
        </div>
      </div>
    </Dialog>
  );
}
