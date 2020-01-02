import {Card, Classes, Colors, H4, Icon, Intent, Tag} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import * as jspb from "google-protobuf";
import React from "react";
import {useHistory} from "react-router";

import "./_projectCard.scss";

import {parseID} from "../../../core/id";
import {projectSwapID} from "../../../core/id/id";
import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";
import * as PhotoUtils from "../../../utils/photo";

export type ProjectInfo = {
  projectID: string;
  name?: string;
  description?: string;
  photo?: Photo;
  photoDescription?: string;
  hasSwap: boolean;
};

export function buildProjectInfo(
  swaps: jspb.Map<string, Project>,
  photos: jspb.Map<string, Photo>,
  project: Project,
  projectID: string,
): ProjectInfo {
  const swap = swaps.get(projectSwapID(parseID(projectID)).toString());
  return {
    projectID,
    name: swap?.getName() || project.getName(),
    description: swap?.getDescription() || project.getDescription(),
    photo: photos.get((project.getFeaturephoto() || swap?.getFeaturephoto())?.getPhotoid() || ""),
    photoDescription: (project.getFeaturephoto() || swap?.getFeaturephoto())?.getDescription(),
    hasSwap: !!swap,
  };
}

export type ProjectCardProps = {
  projectInfo: ProjectInfo;
};

export function ProjectCard({projectInfo}: ProjectCardProps): React.ReactElement {
  const history = useHistory();

  function onOpenProjectManager(): void {
    history.push(`/project/${projectInfo.projectID}`);
  }

  return (
    <div key={projectInfo.projectID} className="w-1/3 p-2">
      <Card onClick={onOpenProjectManager} interactive={true} style={{height: "320px"}}>
        <div className="flex justify-center items-center border border-light-gray-3 mb-3"
          style={{height: "200px", width: "100%"}}>
          {projectInfo.photo ? (
            <img
              src={PhotoUtils.getPhotoURLFromPhotoModel(projectInfo.photo)}
              srcSet={PhotoUtils.getPhotoURLSetFromPhotoModel(projectInfo.photo)}
              alt={projectInfo.photoDescription || ""}
            />
          ) : (
            <Icon icon={IconNames.OFFICE} color={Colors.GRAY3} iconSize={64}/>
          )}
        </div>
        <H4 className={classNames("flex flex-row items-center", projectInfo.name ? "text-blue-3" : "text-gray-3")}>
          <span className={Classes.TEXT_OVERFLOW_ELLIPSIS}
            title={projectInfo.name || "Tên dự án"}>{projectInfo.name || "Tên dự án"}</span>
          {projectInfo.hasSwap &&
          <Tag className="ml-2 not-italic" style={{minWidth: "85px"}} intent={Intent.WARNING}>Đang thay đổi</Tag>}
        </H4>
        <div
          className={classNames("hr-project-card-description", projectInfo.description ? "text-dark-gray-3" : "italic text-gray-3")}
          title={projectInfo.description || "Giới thiệu về dự án"}
        >
          {projectInfo.description || "Giới thiệu về dự án"}
        </div>
      </Card>
    </div>
  );
}
