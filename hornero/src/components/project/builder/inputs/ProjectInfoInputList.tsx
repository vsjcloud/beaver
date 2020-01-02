import produce from "immer";
import React from "react";
import uuid from "uuid";

import {ProjectInfoInput} from "./ProjectInfoInput";

import {FormField} from "../../../../core/form/formField";
import {ProjectInfo} from "../../../../generated/proto/model/project_pb";
import * as Utils from "../../../../utils";

export type ProjectInfoInputListProps = {
  projectInfos: [string, ProjectInfo][];
  onUpdateProjectInfos(cb: (projectInfos: [string, ProjectInfo][]) => [string, ProjectInfo][]): void;
  registerField?<S extends FormField<{}>>(stateAndDispatcher: [S, React.Dispatch<React.SetStateAction<S>>]): [S, React.Dispatch<React.SetStateAction<S>>];
};

export function ProjectInfoInputList({
  projectInfos,
  onUpdateProjectInfos,
  registerField = Utils.identity,
}: ProjectInfoInputListProps): React.ReactElement {
  React.useEffect(function () {
    if (projectInfos.length === 0) {
      onUpdateProjectInfos(projectInfos => produce(projectInfos, draft => {
        for (let i = 0; i < 3; i++) {
          draft.push([uuid.v4(), new ProjectInfo()]);
        }
      }));
    }
  }, [projectInfos, onUpdateProjectInfos]);

  const projectInfoInputs = projectInfos.map((projectInfoAndID, index) => (
    <ProjectInfoInput
      projectInfo={projectInfoAndID[1]}
      index={index}
      onUpdateProjectInfos={onUpdateProjectInfos}
      registerField={registerField}
      key={projectInfoAndID[0]}
    />
  ));

  return (
    <React.Fragment>
      <div>
        {projectInfoInputs}
      </div>
    </React.Fragment>
  )
}
