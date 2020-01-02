import {Tab, Tabs} from "@blueprintjs/core";
import * as jspb from "google-protobuf";
import React from "react";

import {ProjectBuilderPanel} from "./panels/ProjectBuilderPanel";
import {ProjectSettingPanel} from "./panels/ProjectSettingPanel";

import {Photo, PhotoAndID} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";


export type ManageProjectProps = {
  initialProject: Project;
  initialPhotos: jspb.Map<string, Photo>;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
  onSaveProject(editedProject: Project): Promise<void>;
  onSaveSwap(editedSwap: Project): Promise<boolean>;
  onDeleteSwap?(): Promise<void>;
  onArchiveProject(): Promise<void>;
  onProjectNameChange(newName: string): void;
};

export function ProjectManager({
  initialProject,
  initialPhotos,
  onUploadPhoto,
  onSaveProject,
  onSaveSwap,
  onDeleteSwap,
  onArchiveProject,
  onProjectNameChange,
}: ManageProjectProps): React.ReactElement {
  return (
    <div className="mx-auto" style={{width: "600px"}}>
      <Tabs id="ProjectManager" large={true}>
        <Tab
          id="ProjectBuilder"
          title="Thay đổi dự án"
          panelClassName="w-full"
          panel={
            <ProjectBuilderPanel
              initialProject={initialProject}
              initialPhotos={initialPhotos}
              onUploadPhoto={onUploadPhoto}
              onSaveProject={onSaveProject}
              onSaveSwap={onSaveSwap}
              onDeleteSwap={onDeleteSwap}
              onProjectNameChange={onProjectNameChange}
            />
          }
        />
        <Tab
          id="ProjectSetting"
          title="Quản lý chung"
          panelClassName="w-full"
          panel={
            <ProjectSettingPanel
              onArchiveProject={onArchiveProject}
            />
          }
        />
      </Tabs>
    </div>
  );
}
