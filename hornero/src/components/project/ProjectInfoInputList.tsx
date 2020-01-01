import produce from "immer";
import React from "react";
import uuid from "uuid";

import {ProjectInfoInput} from "./ProjectInfoInput";

import {FormField} from "../../core/form/formField";
import {ProjectInfo} from "../../generated/proto/model/project_pb";
import * as Utils from "../../utils";

export type ProjectInfoInputListProps = {
  projectInfos: [string, ProjectInfo][];
  onUpdateProjectInfos(projectInfos: [string, ProjectInfo][]): void;
  registerField?<S extends FormField<{}>>(stateAndDispatcher: [S, React.Dispatch<React.SetStateAction<S>>]): [S, React.Dispatch<React.SetStateAction<S>>];
};

export function ProjectInfoInputList({
  projectInfos,
  onUpdateProjectInfos,
  registerField = Utils.identity,
}: ProjectInfoInputListProps): React.ReactElement {
  function onAddProjectInfo(position: number): void {
    onUpdateProjectInfos(produce(projectInfos, draft => {
      draft.splice(position, 0, [uuid.v4(), new ProjectInfo()]);
    }));
  }

  function onDeleteProjectInfo(position: number): void {
    onUpdateProjectInfos(produce(projectInfos, draft => {
      draft.splice(position, 1);
    }));
  }

  function onUpdateProjectInfo(position: number, projectInfo: ProjectInfo): void {
    onUpdateProjectInfos(produce(projectInfos, draft => {
      draft.splice(position, 1, [draft[position][0], projectInfo]);
    }));
  }

  React.useEffect(function () {
    if (projectInfos.length === 0) {
      onUpdateProjectInfos(produce(projectInfos, draft => {
        for (let i = 0; i < 3; i++) {
          draft.push([uuid.v4(), new ProjectInfo()]);
        }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfos]);

  const projectInfoInputs = projectInfos.map((projectInfoAndID, index) => (
    <ProjectInfoInput
      key={projectInfoAndID[0]}
      onUpdateProjectInfo={(projectInfo): void => onUpdateProjectInfo(index, projectInfo)}
      onAddProjectInfoToAbove={(): void => onAddProjectInfo(index)}
      onAddProjectInfoToBelow={(): void => onAddProjectInfo(index + 1)}
      onDeleteProjectInfo={(): void => onDeleteProjectInfo(index)}
      projectInfo={projectInfoAndID[1]}
      registerField={registerField}
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
