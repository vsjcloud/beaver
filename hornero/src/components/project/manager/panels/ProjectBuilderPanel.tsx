import * as jspb from "google-protobuf";
import React from "react";

import {Photo, PhotoAndID} from "../../../../generated/proto/model/photo_pb";
import {Project, ProjectTag} from "../../../../generated/proto/model/project_pb";
import {ProjectBuilder} from "../../builder/ProjectBuilder";

export type ProjectBuilderPanelProps = {
  initialProject: Project;
  initialPhotos: jspb.Map<string, Photo>;
  projectTags: jspb.Map<string, ProjectTag>;
  onUploadPhoto(photo: File): Promise<PhotoAndID>;
  onSaveProject(editedProject: Project): Promise<void>;
  onSaveSwap(editedSwap: Project, unmount: boolean): Promise<boolean>;
  onDeleteSwap?(): Promise<void>;
  onProjectNameChange(newName: string): void;
};

export function ProjectBuilderPanel({
  initialProject,
  initialPhotos,
  projectTags,
  onUploadPhoto,
  onSaveProject,
  onSaveSwap,
  onDeleteSwap,
  onProjectNameChange,
}: ProjectBuilderPanelProps): React.ReactElement {
  return (
    <ProjectBuilder
      initialProject={initialProject}
      initialPhotos={initialPhotos}
      projectTags={projectTags}
      onUploadPhoto={onUploadPhoto}
      onSaveProject={onSaveProject}
      onSaveSwap={onSaveSwap}
      onDeleteSwap={onDeleteSwap}
      onProjectNameChange={onProjectNameChange}
    />
  );
}
