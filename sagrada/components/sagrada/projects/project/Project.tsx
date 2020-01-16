import React from "react";

import {AlbumPhotoCarousel} from "./AlbumPhotosCarousel";
import {ProjectInfoList} from "./ProjectInfoList";

import {Photo} from "../../../../common/generated/proto/model/photo_pb";
import {Project as PBProject, ProjectTag} from "../../../../common/generated/proto/model/project_pb";
import * as DateTimeUtils from "../../../../common/utils/datetime";
import {BaseLayout} from "../../layout/BaseLayout";
import {ProjectTagList} from "../ProjectTagList";



export type ProjectProps = {
  project: PBProject.AsObject;
  photos: Map<string, Photo.AsObject>;
  tags: Map<string, ProjectTag.AsObject>;
};

export function Project({project, photos, tags}: ProjectProps): React.ReactElement {
  const startDate = DateTimeUtils.pbTimestampObjectToLuxonDateTime(project.startdate);
  const finishDate = DateTimeUtils.pbTimestampObjectToLuxonDateTime(project.finishdate);
  return (
    <BaseLayout>
      <h1
        className="font-display text-4xl lg:text-6xl font-bold w-3/4 mx-auto text-center mt-4 text-blue-3 mb-12"
      >
        {project.name}
      </h1>
      <div className="flex flex-col lg:flex-row mb-16">
        <div className="flex lg:w-3/5 w-full">
          <AlbumPhotoCarousel
            albumPhotos={project.albumphotosList}
            photos={photos}
          />
        </div>
        <div className="flex flex-col w-full lg:w-2/5 lg:ml-6 lg:border-l-4 lg:border-light-gray-1 lg:pl-6 text-gray-1">
          <div className="mb-3">
            <h3 className="text-2xl text-dark-gray-5 font-semibold mb-2">Giới thiệu về dự án</h3>
            <div>{project.description}</div>
          </div>
          {project.tagidsMap.length > 0 &&
          <div className="mb-3">
            <h3 className="text-2xl text-dark-gray-5 font-semibold mb-2">Hạng mục</h3>
            <ProjectTagList
              tags={new Map(project.tagidsMap.map(([tagID]) => [tagID, tags.get(tagID)!]))}
            />
          </div>
          }
          {project.detailsList.length > 0 &&
          <div className="mb-3">
            <h3 className="text-2xl text-dark-gray-5 font-semibold mb-2">Thông tin chi tiết</h3>
            <ProjectInfoList infos={project.detailsList}/>
          </div>
          }
          {startDate &&
          <div className="mb-3">
            <h3 className="text-2xl text-dark-gray-5 font-semibold mb-2">Bắt đầu triển khai</h3>
            <div>{startDate.toFormat("MM/yyyy")}</div>
          </div>
          }
          {finishDate &&
          <div className="mb-3">
            <h3 className="text-2xl text-dark-gray-5 font-semibold mb-2">Hoàn thành</h3>
            <div>{finishDate.toFormat("MM/yyyy")}</div>
          </div>
          }
        </div>
      </div>
    </BaseLayout>
  );
}
