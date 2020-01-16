import {Button, Classes, Dialog, FormGroup, InputGroup} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

import {FormField} from "../../../core/form/formField";
import {StringRequiredRule} from "../../../core/form/rules";
import {ProjectTag} from "../../../generated/proto/model/project_pb";
import * as Utils from "../../../utils";
import {AppToaster} from "../../toaster/AppToaster";

export type EditProjectTagDialogProps = {
  projectTag?: ProjectTag;
  isOpen: boolean;
  onClose(): void;
  onSaveProjectTag(projectTag: ProjectTag): Promise<void>;
};

export function EditProjectTagDialog({
  projectTag,
  isOpen,
  onClose,
  onSaveProjectTag,
}: EditProjectTagDialogProps): React.ReactElement {
  const [name, setName] = React.useState(new FormField("", [
    new StringRequiredRule("Tên hạng mục không được để trống"),
  ]));

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(function () {
    setName(name => new FormField(projectTag?.getName() || "", name.getRules()));
    setIsSubmitting(false);
  }, [projectTag, setName]);

  function onCloseAndReset(): void {
    setName(nameField => new FormField("", name.getRules()));
    setIsSubmitting(false);
    onClose();
  }

  async function onSubmit(): Promise<void> {
    setIsSubmitting(true);
    const projectTag = new ProjectTag();
    projectTag.setName(name.getValue());
    try {
      await onSaveProjectTag(projectTag);
    } catch {
      setIsSubmitting(false);
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Có lỗi xảy ra khi lưu hạng mục. Xin hãy thử lại",
      });
      return;
    }
    AppToaster.show({
      intent: Intent.SUCCESS,
      message: "Lưu hạng mục thành công!",
    });
    onCloseAndReset();
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCloseAndReset}
      title={projectTag ? "Thay đổi hạng mục" : "Tạo hạng mục mới"}
      icon={IconNames.EDIT}
    >
      <div className={Classes.DIALOG_BODY}>
        <FormGroup
          label="Tên hạng mục"
          labelFor="project-tag-name"
          intent={name.intent()}
          helperText={name.message()}
        >
          <InputGroup
            id="project-tag-name"
            placeholder="Nhập tên hạng mục..."
            intent={name.intent()}
            value={name.getValue()}
            onChange={Utils.onInputChange(newValue => setName(name => name.setValue(newValue)))}
          />
        </FormGroup>
      </div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={onClose}>Đóng</Button>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            loading={isSubmitting}
            disabled={!name.isSuccess()}
            onClick={onSubmit}
          >
            {projectTag ? "Lưu thay đổi" :  "Tạo hạng mục"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
