import {Button, Card, Colors, H4, Icon, Intent, Tag} from "@blueprintjs/core";
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
      name: project.getName() || swap?.getName(),
      description: project.getDescription() || swap?.getDescription(),
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
      <Card onClick={onOpenProjectBuilder(info.projectID)} interactive={true}>
        {info.photo ? (
          <img
            src={PhotoUtils.getPhotoURLFromPhotoModel(info.photo)}
            srcSet={PhotoUtils.getPhotoURLSetFromPhotoModel(info.photo)}
            alt={info.photoDescription || ""}
          />
        ) : (
          <div className="flex justify-center items-center" style={{height: "280px", width: "100%"}}>
            <Icon icon={IconNames.OFFICE} color={Colors.GRAY3} iconSize={64}/>
          </div>
        )}
        <H4 className={classNames("flex flex-row items-center", info.name ? "text-blue-3" : "italic text-gray-3")}>
          <span>{info.name || "Tên dự án"}</span>
          {info.hasSwap && <Tag className="ml-2" intent={Intent.WARNING}>Đang chỉnh sửa</Tag>}
        </H4>
        <div
          className={classNames(info.description ? "text-gray-1" : "italic text-gray-3")}>{info.description || "Giới thiệu về dự án"}</div>
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

  return (
    <React.Fragment>
      <div className="mb-2">
        <Button intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
      </div>
      <div className="flex flex-row flex-wrap -mx-2">
        {projectCards}
      </div>
    </React.Fragment>
  );
}
