import {Button, ControlGroup, FormGroup, InputGroup, Intent, Menu, Popover, Position, Tooltip} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import React from "react";

import {FormField} from "../../core/form/formField";
import {ValidationResult, ValidationRule} from "../../core/form/rules";
import {ProjectInfo} from "../../generated/proto/model/project_pb";
import * as Utils from "../../utils";

export type ProjectInfoInputProps = {
  projectInfo: ProjectInfo;
  onUpdateProjectInfo(projectInfo: ProjectInfo): void;
  onAddProjectInfoToAbove(): void;
  onAddProjectInfoToBelow(): void;
  onDeleteProjectInfo(): void;
  registerField?<S extends FormField<{}>>(stateAndDispatcher: [S, React.Dispatch<React.SetStateAction<S>>]): [S, React.Dispatch<React.SetStateAction<S>>];
};

type NameAndValue = {
  name: string;
  value: string;
};

class NameAndValueRequiredRule implements ValidationRule<NameAndValue> {
  public validate(value: NameAndValue): ValidationResult {
    if ((value.name.trim() === "") === (value.value.trim() === "")) {
      return {
        success: true,
        message: "",
      }
    }
    if (value.name.trim() === "") {
      return {
        success: false,
        message: "Thông tin không được để trống",
      }
    }
    return {
      success: false,
      message: "Nội dung không được để trống",
    }
  }
}

export function ProjectInfoInput({
  projectInfo,
  onUpdateProjectInfo,
  onAddProjectInfoToAbove,
  onAddProjectInfoToBelow,
  onDeleteProjectInfo,
  registerField = Utils.identity,
}: ProjectInfoInputProps): React.ReactElement {
  const [nameAndValue, setNameAndValue] = registerField(React.useState(new FormField<NameAndValue>(
    {
      name: projectInfo.getName(),
      value: projectInfo.getValue(),
    }, [
      new NameAndValueRequiredRule(),
    ])));

  function syncSetNameAndValue(nv: NameAndValue): void {
    const projectInfo = new ProjectInfo();
    projectInfo.setName(nv.name.trim());
    projectInfo.setValue(nv.value.trim());
    setNameAndValue(nameAndValue.setValue(nv));
    onUpdateProjectInfo(projectInfo);
  }

  function onUpdateName(newName: string): void {
    syncSetNameAndValue({
      name: newName,
      value: nameAndValue.getValue().value,
    });
  }

  function onUpdateValue(newValue: string): void {
    syncSetNameAndValue({
      name: nameAndValue.getValue().name,
      value: newValue,
    });
  }

  return (
    <FormGroup
      intent={nameAndValue.intent()}
      helperText={nameAndValue.message()}
    >
      <ControlGroup>
        <InputGroup
          style={{width: "180px"}}
          leftIcon={IconNames.LABEL}
          placeholder="Thông tin..."
          value={nameAndValue.getValue().name}
          intent={nameAndValue.getValue().name === "" ? nameAndValue.intent() : Intent.NONE}
          onChange={Utils.onInputChange(onUpdateName)}
        />
        <InputGroup
          fill={true}
          leftIcon={IconNames.EDIT}
          placeholder="Nội dung..."
          value={nameAndValue.getValue().value}
          intent={nameAndValue.getValue().value === "" ? nameAndValue.intent() : Intent.NONE}
          onChange={Utils.onInputChange(onUpdateValue)}
        />
        <Tooltip content="Thêm thông tin dưới" position={Position.BOTTOM}>
          <Button icon={IconNames.ADD_ROW_BOTTOM} onClick={onAddProjectInfoToBelow}/>
        </Tooltip>
        <Popover position={Position.RIGHT}>
          <Button icon={IconNames.MENU}/>
          <Menu>
            <Menu.Item icon={IconNames.ADD_ROW_TOP} onClick={onAddProjectInfoToAbove} text="Thêm thông tin trên"/>
            <Menu.Item icon={IconNames.ADD_ROW_BOTTOM} onClick={onAddProjectInfoToBelow} text="Thêm thông tin dưới"/>
            <Menu.Item icon={IconNames.DELETE} onClick={onDeleteProjectInfo} intent={Intent.DANGER} text="Xóa thông tin"/>
          </Menu>
        </Popover>
      </ControlGroup>
    </FormGroup>
  );
}
