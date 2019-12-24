import {Button, Classes, Dialog, FormGroup, InputGroup} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import produce from "immer";
import React from "react";

import {Photo} from "./PhotoUploader";

import {FormField} from "../../core/form/field";
import {RequiredRule} from "../../core/form/rules";

export interface EditPhotoDialogProps {
  photo?: Photo;

  onClose(): void;
  onSubmit(photo: Photo): void;
}

export interface EditPhotoDialogState {
  name: FormField<string>;
  description: FormField<string>;
}

export default class EditPhotoDialog extends React.PureComponent<EditPhotoDialogProps, EditPhotoDialogState> {
  public constructor(props: EditPhotoDialogProps) {
    super(props);
    this.state = EditPhotoDialog.stateFromProps(props);
  }

  private static stateFromProps(props: EditPhotoDialogProps): EditPhotoDialogState {
    const {photo} = props;
    const nameValue = photo ? photo.name : "";
    const descriptionValue = photo ? photo.description : "";
    return {
      name: new FormField<string>(nameValue, [
        new RequiredRule("Tên ảnh không được để trống"),
      ]),
      description: new FormField<string>(descriptionValue, []),
    };
  }

  public componentDidUpdate(prevProps: Readonly<EditPhotoDialogProps>, prevState: Readonly<EditPhotoDialogState>): void {
    const currentID = this.props.photo ? this.props.photo.id : "";
    const prevID = prevProps.photo ? prevProps.photo.id : "";
    if (currentID !== prevID) {
      this.setState(EditPhotoDialog.stateFromProps(this.props));
    }
  }

  public render(): React.ReactNode {
    const {photo, onClose} = this.props;
    if (!photo) {
      return null;
    }
    const {name, description} = this.state;
    return (
      <Dialog isOpen={true} onClose={onClose} icon={IconNames.EDIT} title="Sửa nội dung ảnh">
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label="Tên ảnh"
            labelFor="photo-name"
            labelInfo="(bắt buộc)"
            helperText={name.failureMessage()}
            intent={name.intent()}
          >
            <InputGroup id="photo-name" placeholder="Nhập tên của ảnh..." value={name.getValue()} intent={name.intent()}
              onChange={this.onUpdateName}/>
          </FormGroup>
          <FormGroup
            label="Nội dung ảnh"
            labelFor="photo-description"
            helperText={description.failureMessage()}
            intent={description.intent()}
          >
            <InputGroup id="photo-description" placeholder="Nhập nội dung của ảnh..." value={description.getValue()}
              intent={description.intent()}
              onChange={this.onUpdateDescription}/>
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.props.onClose}>Đóng</Button>
            <Button onClick={this.onSubmit} intent={Intent.PRIMARY} disabled={!this.validate()}>Lưu nội dung</Button>
          </div>
        </div>
      </Dialog>
    );
  }

  private validate(): boolean {
    return this.state.name.isSuccess() && this.state.description.isSuccess();
  }

  private onUpdateName = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({name: this.state.name.updateValue(event.currentTarget.value)});
  };

  private onUpdateDescription = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({description: this.state.description.updateValue(event.currentTarget.value)});
  };

  private onSubmit = (): void => {
    if (!this.props.photo) {
      return;
    }
    const nextPhoto = produce(this.props.photo, draft => {
      draft.name = this.state.name.getValue();
      draft.description = this.state.description.getValue();
    });
    this.props.onSubmit(nextPhoto);
    this.props.onClose();
  }
}
