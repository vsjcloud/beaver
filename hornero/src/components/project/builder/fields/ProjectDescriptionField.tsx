import {FormGroup, TextArea} from "@blueprintjs/core";
import React from "react";

import {FormField} from "../../../../core/form/formField";
import {PropsWithRegisterField} from "../../../../core/form/formValidator";
import {StringRequiredRule} from "../../../../core/form/rules";
import * as Utils from "../../../../utils";

export type ProjectDescriptionFieldProps = PropsWithRegisterField<{
  initialValue: string;
  onChange(newValue: string): void;
}>;

export function ProjectDescriptionField({
  initialValue,
  onChange,
  registerField = Utils.identity,
}: ProjectDescriptionFieldProps): React.ReactElement {
  const [description, setDescription] = registerField(React.useState(new FormField(initialValue, [
    new StringRequiredRule("Giới thiệu về dự án không được để trống"),
  ])));

  React.useEffect(function () {
    const tick = setTimeout(function () {
      onChange(description.getValue());
    }, Utils.INPUT_DEBOUNCE_TIME);
    return (): void => clearTimeout(tick);
  }, [onChange, description]);

  return (
    <FormGroup
      label="Giới thiệu về dự án"
      labelFor="project-description"
      labelInfo="(bắt buộc)"
      intent={description.intent()}
      helperText={description.message()}
    >
      <TextArea
        id="project-description"
        value={description.getValue()}
        fill={true}
        growVertically={true}
        style={{minHeight: "120px"}}
        onChange={Utils.onTextAreaChange(newValue => setDescription(description => description.setValue(newValue)))}
        intent={description.intent()}
        placeholder="Giới thiệu về dự án..."
      />
    </FormGroup>
  );
}
