import {Button, Card, Classes, Colors, H4, Icon, Intent, NonIdealState, Tag, Tooltip} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import * as jspb from "google-protobuf";
import React from "react";
import {useHistory} from "react-router";

import {parseID} from "../../core/id";
import {projectSwapID} from "../../core/id/id";
import {Photo} from "../../generated/proto/model/photo_pb";
import {Project} from "../../generated/proto/model/project_pb";
import * as Utils from "../../utils";
import * as PhotoUtils from "../../utils/photo";

import "./_projectCard.scss";

export type ProjectsGridProps = React.PropsWithChildren<{
  projects: jspb.Map<string, Project>;
  swaps: jspb.Map<string, Project>;
  photos: jspb.Map<string, Photo>;
  onCreateNewProject(): Promise<void>;
}>;

type ProjectInfo = {
  projectID: string;
  name?: string;
  description?: string;
  photo?: Photo;
  photoDescription?: string;
  hasSwap: boolean;
};

export function ProjectsGrid({
  projects,
  swaps,
  photos,
  onCreateNewProject,
}: ProjectsGridProps): React.ReactElement {
  const history = useHistory();

  const buildProjectInfo = (project: Project, projectID: string): ProjectInfo => {
    const swap = swaps.get(projectSwapID(parseID(projectID)).toString());
    return {
      projectID,
      name: swap?.getName() || project.getName(),
      description: swap?.getDescription() || project.getDescription(),
      photo: photos.get((project.getFeaturephoto() || swap?.getFeaturephoto())?.getPhotoid() || ""),
      photoDescription: (project.getFeaturephoto() || swap?.getFeaturephoto())?.getDescription(),
      hasSwap: !!swap,
    };
  };

  const onOpenProjectBuilder = (projectID: string) => (): void => {
    history.push(`/project/${projectID}/build`);
  };

  const renderProjectCard = (info: ProjectInfo): React.ReactNode => (
    <div key={info.projectID} className="w-1/3 p-2">
      <Card onClick={onOpenProjectBuilder(info.projectID)} interactive={true} style={{height: "423px"}}>
        <div className="flex justify-center items-center border border-light-gray-3 mb-3"
          style={{height: "280px", width: "100%"}}>
          {info.photo ? (
            <img
              src={PhotoUtils.getPhotoURLFromPhotoModel(info.photo)}
              srcSet={PhotoUtils.getPhotoURLSetFromPhotoModel(info.photo)}
              alt={info.photoDescription || ""}
            />
          ) : (
            <Icon icon={IconNames.OFFICE} color={Colors.GRAY3} iconSize={64}/>
          )}
        </div>
        <H4 className={classNames("flex flex-row items-center", info.name ? "text-blue-3" : "text-gray-3")}>
          <span className={Classes.TEXT_OVERFLOW_ELLIPSIS} title={info.name || "Tên dự án"}>{info.name || "Tên dự án"}</span>
          {info.hasSwap &&
          <Tag className="ml-2 not-italic" style={{minWidth: "85px"}} intent={Intent.WARNING}>Đang thay đổi</Tag>}
        </H4>
        <div
          className={classNames("hr-project-card-description", info.description ? "text-dark-gray-3" : "italic text-gray-3")}
          title={info.description || "Giới thiệu về dự án"}
        >
          {info.description || "Giới thiệu về dự án"}
        </div>
      </Card>
    </div>
  );

  const projectCards = Utils
    .pbMapTransform(projects, buildProjectInfo)
    .sort((ls, rs) => {
      if (ls.projectID > rs.projectID) return -1;
      if (ls.projectID < rs.projectID) return 1;
      return 0;
    })
    .map(renderProjectCard);

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

  return (
    <React.Fragment>
      <div className="mb-2">
        {addNewProjectButton}
      </div>
      <div className="flex flex-row flex-wrap -mx-2">
        {projectCards}
      </div>
    </React.Fragment>
  );
}
