import {Button, Intent, NonIdealState} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import * as jspb from "google-protobuf";
import React from "react";

import {buildProjectInfo, ProjectCard} from "./ProjectCard";

import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";
import * as Utils from "../../../utils";

export type ActiveProjectsPanel = {
  projects: jspb.Map<string, Project>;
  swaps: jspb.Map<string, Project>;
  photos: jspb.Map<string, Photo>;
  onCreateNewProject(): Promise<void>;
};

export function ActiveProjectsPanel({
  projects,
  swaps,
  photos,
  onCreateNewProject,
}: ActiveProjectsPanel): React.ReactElement {
  const addNewProjectButton = (
    <Button icon={IconNames.ADD} intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
  );

  if (projects.getLength() === 0) {
    return (
      <div style={{height: "calc(100vh - 50px - 2rem)"}}>
        <NonIdealState
          icon={IconNames.PROJECTS}
          title="Không có dự án nào"
          description="Bắt đầu tạo dự án bằng cách nhấn vào nút bên dưới"
          action={addNewProjectButton}
        />
      </div>
    );
  }

  const projectCards = Utils
    .pbMapTransform(projects, (project, projectID) => buildProjectInfo(swaps, photos, project, projectID))
    .sort((ls, rs) => {
      if (ls.projectID > rs.projectID) return -1;
      if (ls.projectID < rs.projectID) return 1;
      return 0;
    })
    .map(projectInfo => (
      <ProjectCard key={projectInfo.projectID} projectInfo={projectInfo}/>
    ));

  return (
    <React.Fragment>
      <div className="flex flex-row flex-wrap -mx-2">
        {projectCards}
      </div>
    </React.Fragment>
  );
}
