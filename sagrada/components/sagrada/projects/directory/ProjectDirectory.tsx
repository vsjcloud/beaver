import React from "react";

import {ProjectCard, ProjectCardInfo} from "./ProjectCard";

import {Photo} from "../../../../common/generated/proto/model/photo_pb";
import {Project, ProjectTag} from "../../../../common/generated/proto/model/project_pb";
import * as PhotoUtils from "../../../../common/utils/photo";
import {ButtonColor} from "../../../core/button/AbstractButton";
import {Button} from "../../../core/button/Button";
import {LinkButton} from "../../../core/button/LinkButton";
import {IconName} from "../../../core/icon/iconName";
import {NonIdeaState} from "../../../core/non-idea-state/NonIdeaState";
import {BaseLayout} from "../../layout/BaseLayout";


export type ProjectDirectoryProps = {
  projects: Map<string, Project.AsObject>;
  photos: Map<string, Photo.AsObject>;
  tags: Map<string, ProjectTag.AsObject>;
};

export function ProjectDirectory({projects, photos, tags}: ProjectDirectoryProps): React.ReactElement {
  const cards = Array.from(projects)
    .sort(([firstID], [secondID]) => {
      if (firstID > secondID) return -1;
      if (firstID < secondID) return 1;
      return 0;
    })
    .map(([projectID, project]) => {
      const featurePhoto = photos.get(project.featurephoto?.photoid || "");
      const cardInfo: ProjectCardInfo = {
        projectID: projectID,
        name: project.name,
        description: project.description,
        tags: new Map(project.tagidsMap.map(([tagID]) => [tagID, tags.get(tagID)!])),
        preview: PhotoUtils.getPhotoURLFromPhotoModel(featurePhoto),
        previewSet: PhotoUtils.getPhotoURLSetFromPhotoModel(featurePhoto),
      };
      return (
        <ProjectCard
          key={projectID}
          info={cardInfo}
          className="p-4 w-full md:w-1/2 lg:w-1/3 cursor-pointer"
        />
      );
    });

  return (
    <BaseLayout>
      <div>
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-center text-blue-1">Dự án của VSJ</h1>
        <h3 className="mx-auto text-center w-3/4 text-lg lg:text-2xl text-dark-gray-5 mb-6">
          VSJ đã và đang tham gia vào nhiều dự án quan trọng với quy mô lớn
        </h3>
        <Button className="mx-auto block" buttonColor={ButtonColor.Blue}>Liên hệ tư vấn</Button>
      </div>
      {cards.length === 0 ? (
        <NonIdeaState
          className="h-full my-20"
          icon={IconName.Projects}
          title="Không có dự án"
          description="Không tìm thấy dự án nào trong mục này."
          action={
            <LinkButton to="/">Quay lại trang chủ</LinkButton>
          }
        />
      ) : (
        <div className="flex flex-row flex-wrap -mx-4 my-12">
          {cards}
        </div>
      )}
    </BaseLayout>
  );
}
