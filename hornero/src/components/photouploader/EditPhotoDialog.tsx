import {Button, Classes, Dialog, FormGroup, InputGroup} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

import {Photo} from "./PhotoUploader";

import {Field} from "../../form/field";
import {RequiredRule} from "../../form/rules";
import {FieldValidator, NoopValidator} from "../../form/validator";


export interface EditPhotoDialogProps {
  photo?: Photo;

  onClose(): void;
}

export interface EditPhotoDialogState {
  name: Field<string>;
  description: Field<string>;
}

export default class EditPhotoDialog extends React.PureComponent<EditPhotoDialogProps, EditPhotoDialogState> {
  private static readonly nameValidator: FieldValidator = new FieldValidator([
    new RequiredRule("Tên ảnh không được để trống"),
  ]);

  public constructor(props: EditPhotoDialogProps) {
    super(props);
    this.state = EditPhotoDialog.stateFromProps(props);
  }

  private static stateFromProps(props: EditPhotoDialogProps): EditPhotoDialogState {
    const {photo} = props;
    const nameValue = photo ? photo.name : "";
    const descriptionValue = photo ? photo.description : "";
    return {
      name: new Field<string>(nameValue, this.nameValidator),
      description: new Field<string>(descriptionValue, NoopValidator),
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
            <Button intent={Intent.PRIMARY} disabled={!this.validate()}>Lưu nội dung</Button>
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
}
