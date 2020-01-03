import React from "react";

import {ProjectSetting} from "../../setting/ProjectSetting";

export type ProjectSettingPanelProps = {
  onArchiveProject?(): Promise<void>;
  onRecoverProject?(): Promise<void>;
};

export function ProjectSettingPanel({onArchiveProject, onRecoverProject}: ProjectSettingPanelProps): React.ReactElement {
  return (
    <ProjectSetting onArchiveProject={onArchiveProject} onRecoverProject={onRecoverProject}/>
  )
}
