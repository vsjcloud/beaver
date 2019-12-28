import * as jspb from "google-protobuf";
import {Divider, H3} from "@blueprintjs/core";
import React from "react";
import {useParams} from "react-router";

import {ProjectBuilder} from "./ProjectBuilder";

import {usePhotoClient} from "../../services/photo";
import {Photo} from "../../generated/proto/model/photo_pb";
import {BulkGetPhotosRequest} from "../../generated/proto/rpc/photo/photo_pb";
import {Project} from "../../generated/proto/model/project_pb";
import {GetProjectWithSwapRequest} from "../../generated/proto/rpc/project/project_pb";
import {useProjectClient} from "../../services/project";
import * as Utils from "../../utils";
import * as ProjectUtils from "../../utils/project";
import {BaseLayout} from "../layout/BaseLayout";

export function ProjectBuilderContainer(): React.ReactElement {
  const projectClient = useProjectClient();
  const photoClient = usePhotoClient();

  const {projectID} = useParams();
  const newProject = !!Utils.useQuery().get("new");

  const [loading, setLoading] = React.useState(true);
  const [project, setProject] = React.useState(new Project());
  const [photos, setPhotos] = React.useState(new jspb.Map<string, Photo>([]));

  React.useEffect(function () {
    if (!projectID) return;
    if (newProject) {
      setLoading(false);
      return;
    }
    (async function (): Promise<void> {
      const project = await async function (): Promise<Project> {
        const request = new GetProjectWithSwapRequest();
        request.setProjectid(projectID);
        const response = await projectClient.getProjectWithSwap(request);
        return response.getSwap() || response.getProject() || new Project();
      }();
      setProject(project);
      const photos = await async function (): Promise<jspb.Map<string, Photo>> {
        const request = new BulkGetPhotosRequest();
        ProjectUtils.updatePhotoSetWithProjectPhotos(request.getPhotoidsMap(), project);
        const response = await photoClient.bulkGetPhotos(request);
        return response.getPhotosMap();
      }();
      setPhotos(photos);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProject, projectID]);

  return (
    <BaseLayout loading={loading}>
      <div className="mx-auto" style={{width: "500px"}}>
        <H3>{newProject ? "Tạo dự án mới" : "Chỉnh sửa dự án"}</H3>
        <Divider className="mb-6"/>
        <ProjectBuilder project={project} photos={photos} onUploadPhoto={photoClient.uploadPhoto}/>
      </div>
    </BaseLayout>
  );
}
