import {Divider, H3} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import * as jspb from "google-protobuf";
import React from "react";
import {useHistory, useParams} from "react-router";

import {ProjectBuilder} from "./ProjectBuilder";

import {parseID} from "../../../core/id";
import {projectSwapID} from "../../../core/id/id";
import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project, ProjectInfo, ProjectPhoto} from "../../../generated/proto/model/project_pb";
import {BulkGetPhotosRequest} from "../../../generated/proto/rpc/photo/photo_pb";
import {
  DeleteProjectSwapRequest,
  GetProjectWithSwapRequest,
  UpdateProjectAndRemoveSwapRequest,
  UpdateProjectSwapRequest,
} from "../../../generated/proto/rpc/project/project_pb";
import {usePhotoClient} from "../../../services/photo";
import {useProjectClient} from "../../../services/project";
import * as Utils from "../../../utils";
import * as ProjectUtils from "../../../utils/project";
import {BaseLayout} from "../../layout/BaseLayout";
import {AppToaster} from "../../toaster/AppToaster";

export function ProjectBuilderContainer(): React.ReactElement {
  const history = useHistory();

  const projectClient = useProjectClient();
  const photoClient = usePhotoClient();

  const {projectID} = useParams();
  const newProject = !!Utils.useQuery().get("new");

  const [loading, setLoading] = React.useState(true);
  const [project, setProject] = React.useState<Project>();
  const [swap, setSwap] = React.useState<Project>();
  const [editingProject, setEditingProject] = React.useState<Project>();
  const [photos, setPhotos] = React.useState(new jspb.Map<string, Photo>([]));

  React.useEffect(function () {
    if (!projectID) return;
    if (newProject) {
      setLoading(false);
      return;
    }
    (async function (): Promise<void> {
      const [project, swap] = await async function (): Promise<[Project | undefined, Project | undefined]> {
        const request = new GetProjectWithSwapRequest();
        request.setProjectid(projectID);
        const response = await projectClient.getProjectWithSwap(request);
        return [response.getProject(), response.getSwap()];
      }();
      setProject(project);
      setSwap(swap);
      const editingProject = swap || project || new Project();
      setEditingProject(editingProject);
      const photos = await async function (): Promise<jspb.Map<string, Photo>> {
        const request = new BulkGetPhotosRequest();
        ProjectUtils.updatePhotoSetWithProjectPhotos(request.getPhotoidsMap(), editingProject);
        const response = await photoClient.bulkGetPhotos(request);
        return response.getPhotosMap();
      }();
      setPhotos(photos);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProject, projectID]);

  function projectPhotoEqual(first?: ProjectPhoto, second?: ProjectPhoto): boolean {
    if (!!first === !!second) return true;
    if (!first || !second) return false;
    return first.getPhotoid() === second.getPhotoid() && first.getDescription() === second.getDescription();
  }

  function projectInfoEqual(first?: ProjectInfo, second?: ProjectInfo): boolean {
    if (!!first === !!second) return true;
    if (!first || !second) return false;
    return first.getName() === second.getName() && first.getValue() === second.getValue();
  }

  function doesProjectChange(currentProject: Project, editingProject: Project): boolean {
    if (!currentProject) return true;
    if (currentProject.getName() !== editingProject.getName()) return true;
    if (currentProject.getDescription() !== editingProject.getDescription()) return true;
    if (!projectPhotoEqual(currentProject.getFeaturephoto(), editingProject.getFeaturephoto())) return true;
    if (currentProject.getAlbumphotosList().length !== editingProject.getAlbumphotosList().length) return true;
    for (let i = 0; i < currentProject.getAlbumphotosList().length; i++) {
      if (!projectPhotoEqual(currentProject.getAlbumphotosList()[i], editingProject.getAlbumphotosList()[i])) return true;
    }
    if (currentProject.getDetailsList().length !== editingProject.getDetailsList().length) return true;
    for (let i = 0; i < currentProject.getDetailsList().length; i++) {
      if (!projectInfoEqual(currentProject.getDetailsList()[i], editingProject.getDetailsList()[i])) return true;
    }
    return false;
  }

  const submitting = React.useRef(false);

  async function onSaveProject(editingProject: Project): Promise<void> {
    submitting.current = true;
    setLoading(true);
    const request = new UpdateProjectAndRemoveSwapRequest();
    request.setProjectid(projectID!);
    request.setProject(editingProject);
    try {
      await projectClient.updateProjectAndRemoveSwap(request);
    } catch {
      setLoading(false);
      submitting.current = false;
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Có lỗi xảy ra khi lưu dự án. Xin hãy thử lại",
      });
      return;
    }
    AppToaster.show({
      intent: Intent.SUCCESS,
      message: "Lưu dự án thành công",
    });
    history.replace("/projects");
  }

  async function onSaveSwap(editingSwap: Project): Promise<boolean> {
    if (submitting.current) return false;
    if (!swap && !doesProjectChange(project!, editingSwap)) return false;
    if (swap && !doesProjectChange(swap, editingSwap)) return false;
    const request = new UpdateProjectSwapRequest();
    request.setSwapid(projectSwapID(parseID(projectID!)).toString());
    request.setSwap(editingSwap);
    await projectClient.updateProjectSwap(request);
    return true;
  }

  async function onDeleteSwap(): Promise<void> {
    if (!swap) return;
    submitting.current = true;
    setLoading(true);
    const request = new DeleteProjectSwapRequest();
    request.setSwapid(projectSwapID(parseID(projectID!)).toString());
    try {
      await projectClient.deleteProjectSwap(request);
    } catch {
      setLoading(false);
      submitting.current = false;
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Có lỗi xảy ra khi xóa thay đổi. Xin hãy thử lại",
      });
      return;
    }
    AppToaster.show({
      intent: Intent.SUCCESS,
      message: "Xóa thay đổi thành công",
    });
    history.replace("/projects");
  }

  return (
    <BaseLayout loading={loading}>
      <div className="mx-auto" style={{width: "600px"}}>
        <H3>{newProject ? "Tạo dự án mới" : "Thay đổi dự án"}</H3>
        <Divider className="mb-6"/>
        <ProjectBuilder
          initialProject={editingProject!}
          initialPhotos={photos}
          onUploadPhoto={photoClient.uploadPhoto}
          onSaveProject={onSaveProject}
          onSaveSwap={onSaveSwap}
          onDeleteSwap={swap ? onDeleteSwap : undefined}
        />
      </div>
    </BaseLayout>
  );
}
