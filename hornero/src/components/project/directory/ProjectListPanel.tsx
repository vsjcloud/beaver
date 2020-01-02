import {Button, Intent, Tab, Tabs} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import * as jspb from "google-protobuf";
import React from "react";

import {ActiveProjectsPanel} from "./ActiveProjectsPanel";
import {ArchivedProjectsPanel} from "./ArchivedProjectsPanel";

import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";


export type ProjectDirectoryPanelProps = {
  projects: jspb.Map<string, Project>;
  swaps: jspb.Map<string, Project>;
  photos: jspb.Map<string, Photo>;
  onCreateNewProject(): Promise<void>;
};

export function ProjectListPanel({
  projects,
  swaps,
  photos,
  onCreateNewProject,
}: ProjectDirectoryPanelProps): React.ReactElement {
  return (
    <Tabs id="ProjectListPanel">
      <Tab
        id="ActiveProjects"
        title="Danh sách dự án"
        panelClassName="mt-2"
        panel={
          <ActiveProjectsPanel
            projects={projects}
            swaps={swaps}
            photos={photos}
            onCreateNewProject={onCreateNewProject}
          />
        }
      />
      <Tab
        id="ArchivedProjects"
        title="Danh sách lưu trữ"
        panel={
          <ArchivedProjectsPanel
          />
        }
      />
      <Tabs.Expander/>
      <Button icon={IconNames.ADD} intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
    </Tabs>
  );
}
