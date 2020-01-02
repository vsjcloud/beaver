import {FormGroup} from "@blueprintjs/core";
import React from "react";
import uuid from "uuid";

import {FormField} from "../../../../core/form/formField";
import {PropsWithRegisterField} from "../../../../core/form/formValidator";
import {ProjectInfo} from "../../../../generated/proto/model/project_pb";
import * as Utils from "../../../../utils";
import {ProjectInfoInputList} from "../inputs/ProjectInfoInputList";

export type ProjectInfosFieldProps = PropsWithRegisterField<{
  initialValue: ProjectInfo[];
  onChange(newValue: ProjectInfo[]): void;
}>;

export function ProjectInfosField({
  initialValue,
  onChange,
  registerField = Utils.identity,
}: ProjectInfosFieldProps): React.ReactElement {
  const [projectInfos, setProjectInfos] = registerField(
    React.useState(
      new FormField(
        initialValue.map<[string, ProjectInfo]>((projectInfo) => [uuid.v4(), projectInfo]),
        [],
      ),
    ),
  );

  React.useEffect(function () {
    onChange(projectInfos.getValue().map(([_, projectInfo]) => projectInfo));
  }, [onChange, projectInfos]);

  const onUpdateProjectInfos = React.useCallback(function (cb: (projectInfos: [string, ProjectInfo][]) => [string, ProjectInfo][]): void {
    setProjectInfos(projectInfos => projectInfos.setValue(cb(projectInfos.getValue())));
  }, [setProjectInfos]);

  return (
    <FormGroup
      label="Thông tin chi tiết"
    >
      <ProjectInfoInputList
        projectInfos={projectInfos.getValue()}
        onUpdateProjectInfos={onUpdateProjectInfos}
        registerField={registerField}
      />
    </FormGroup>
  )
}
