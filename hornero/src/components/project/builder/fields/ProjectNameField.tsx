import {FormGroup, InputGroup} from "@blueprintjs/core";
import React from "react";

import {FormField} from "../../../../core/form/formField";
import {PropsWithRegisterField} from "../../../../core/form/formValidator";
import {StringRequiredRule} from "../../../../core/form/rules";
import * as Utils from "../../../../utils";

export type ProjectNameFieldProps = PropsWithRegisterField<{
  initialValue: string;
  onChange(newValue: string): void;
}>;

export function ProjectNameField({
  initialValue,
  onChange,
  registerField = Utils.identity,
}: ProjectNameFieldProps): React.ReactElement {
  const [name, setName] = registerField(React.useState(new FormField(initialValue, [
    new StringRequiredRule("Tên dự án không được để trống"),
  ])));

  React.useEffect(function () {
    const tick = setTimeout(function () {
      onChange(name.getValue());
    }, Utils.INPUT_DEBOUNCE_TIME);
    return (): void => clearTimeout(tick);
  }, [onChange, name]);

  return (
    <FormGroup
      label="Tên dự án"
      labelFor="project-name"
      labelInfo="(bắt buộc)"
      intent={name.intent()}
      helperText={name.message()}
    >
      <InputGroup
        id="project-name"
        value={name.getValue()}
        onChange={Utils.onInputChange(newValue => setName(name => name.setValue(newValue)))}
        intent={name.intent()}
        placeholder="Tên của dự án..."
      />
    </FormGroup>
  )
}
