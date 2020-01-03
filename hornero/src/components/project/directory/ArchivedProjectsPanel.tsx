import {NonIdealState} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import * as jspb from "google-protobuf";
import React from "react";

import {buildProjectInfo, ProjectCard} from "./ProjectCard";

import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";
import * as Utils from "../../../utils";

export type ArchivedProjectsPanelProps = {
  projects: jspb.Map<string, Project>;
  swaps: jspb.Map<string, Project>;
  photos: jspb.Map<string, Photo>;
};

export function ArchivedProjectsPanel({projects, swaps, photos}: ArchivedProjectsPanelProps): React.ReactElement {
  if (projects.getLength() === 0) {
    return (
      <div style={{height: "calc(100vh - 50px - 2rem)"}}>
        <NonIdealState
          icon={IconNames.ARCHIVE}
          title="Không có dự án nào được lưu trữ"
          description="Những dự án đã được lưu trữ sẽ hiện ở đây. Dự án đã được lưu trữ sẽ không thể truy cập được bởi người dùng."
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
      <ProjectCard archived={true} key={projectInfo.projectID} projectInfo={projectInfo}/>
    ));

  return (
    <React.Fragment>
      <div className="flex flex-row flex-wrap -mx-2">
        {projectCards}
      </div>
    </React.Fragment>
  );
}
