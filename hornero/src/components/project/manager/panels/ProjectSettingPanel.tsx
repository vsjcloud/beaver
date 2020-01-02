import React from "react";

import {ProjectSetting} from "../../setting/ProjectSetting";

export type ProjectSettingPanelProps = {
  onArchiveProject(): Promise<void>;
};

export function ProjectSettingPanel({onArchiveProject}: ProjectSettingPanelProps): React.ReactElement {
  return (
    <ProjectSetting onArchiveProject={onArchiveProject}/>
  )
}
