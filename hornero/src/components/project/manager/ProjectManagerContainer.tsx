import {Tab, Tabs} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import * as jspb from "google-protobuf";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {DateTime} from "luxon";
import React from "react";
import {useHistory, useParams} from "react-router";

import {ProjectBuilderPanel} from "./panels/ProjectBuilderPanel";
import {ProjectSettingPanel} from "./panels/ProjectSettingPanel";
import {ProjectManagerLayout} from "./ProjectManagerLayout";

import {parseID} from "../../../core/id";
import {projectSwapID} from "../../../core/id/id";
import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project, ProjectInfo, ProjectPhoto} from "../../../generated/proto/model/project_pb";
import {BulkGetPhotosRequest} from "../../../generated/proto/rpc/photo/photo_pb";
import {
  ArchiveProjectRequest,
  DeleteProjectSwapRequest,
  GetProjectWithSwapRequest,
  RecoverProjectRequest,
  UpdateProjectAndRemoveSwapRequest,
  UpdateProjectSwapRequest,
} from "../../../generated/proto/rpc/project/project_pb";
import {usePhotoClient} from "../../../services/photo";
import {useProjectClient} from "../../../services/project";
import * as ProjectUtils from "../../../utils/project";
import {AppToaster} from "../../toaster/AppToaster";

export function ProjectManagerContainer(): React.ReactElement {
  const history = useHistory();

  const projectClient = useProjectClient();
  const photoClient = usePhotoClient();

  const {projectID} = useParams();

  const [project, setProject] = React.useState<Project>();
  const [swap, setSwap] = React.useState<Project>();
  const [editingProject, setEditingProject] = React.useState<Project>();
  const [archived, setArchived] = React.useState(false);
  const [photos, setPhotos] = React.useState(new jspb.Map<string, Photo>([]));

  const [projectName, setProjectName] = React.useState("");
  const [saveSwapTime, setSaveSwapTime] = React.useState<DateTime>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(function () {
    if (!projectID) return;
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
      setProjectName(editingProject.getName());
      setEditingProject(editingProject);
      const archived = await async function (): Promise<boolean> {
        const response = await projectClient.getArchivedProjectDirectory(new Empty());
        const archivedProjectIDs = response.getArchivedprojectdirectory()?.getProjectidsMap() || new jspb.Map([]);
        return archivedProjectIDs.has(projectID!);
      }();
      setArchived(archived);
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
  }, [projectID, setLoading]);

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

  async function onSaveSwap(editingSwap: Project, unmount: boolean): Promise<boolean> {
    if (submitting.current) return false;
    if (!swap && !doesProjectChange(project!, editingSwap)) return false;
    if (swap && !doesProjectChange(swap, editingSwap)) return false;
    const request = new UpdateProjectSwapRequest();
    request.setSwapid(projectSwapID(parseID(projectID!)).toString());
    request.setSwap(editingSwap);
    await projectClient.updateProjectSwap(request);
    if (!unmount) {
      setSwap(editingSwap);
      setSaveSwapTime(DateTime.local());
    }
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
        message: "Có lỗi xảy ra khi hủy thay đổi. Xin hãy thử lại",
      });
      return;
    }
    AppToaster.show({
      intent: Intent.SUCCESS,
      message: "Hủy thay đổi thành công",
    });
    history.replace("/projects");
  }

  async function onArchiveProject(): Promise<void> {
    setLoading(true);
    const request = new ArchiveProjectRequest();
    request.setProjectid(projectID!);
    try {
      await projectClient.archiveProject(request);
    } catch {
      setLoading(false);
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Có lỗi xảy ra khi lưu trữ dự án. Xin hãy thử lại",
      });
      return;
    }
    AppToaster.show({
      intent: Intent.SUCCESS,
      message: "Lưu trữ dự án thành công",
    });
    history.replace("/projects");
  }

  async function onRecoverProject(): Promise<void> {
    setLoading(true);
    const request = new RecoverProjectRequest();
    request.setProjectid(projectID!);
    try {
      await projectClient.recoverProject(request);
    } catch {
      setLoading(false);
      AppToaster.show({
        intent: Intent.DANGER,
        message: "Có lỗi xảy ra khi khôi phục dự án. Xin hãy thử lại",
      });
      return;
    }
    AppToaster.show({
      intent: Intent.SUCCESS,
      message: "Khôi phục dự án thành công",
    });
    history.replace("/projects");
  }

  return (
    <ProjectManagerLayout
      projectName={projectName}
      saveSwapTime={saveSwapTime}
      loading={loading}
      archived={archived}
      hasSwap={!!swap}
    >
      <div className="mx-auto" style={{width: "600px"}}>
        <Tabs id="ProjectManager" large={true}>
          <Tab
            id="ProjectBuilder"
            title="Thay đổi dự án"
            panelClassName="w-full"
            panel={
              <ProjectBuilderPanel
                initialProject={editingProject!}
                initialPhotos={photos}
                onUploadPhoto={photoClient.uploadPhoto}
                onSaveProject={onSaveProject}
                onSaveSwap={onSaveSwap}
                onDeleteSwap={swap ? onDeleteSwap : undefined}
                onProjectNameChange={setProjectName}
              />
            }
          />
          <Tab
            id="ProjectSetting"
            title="Quản lý chung"
            panelClassName="w-full"
            panel={
              <ProjectSettingPanel
                onArchiveProject={!archived ? onArchiveProject : undefined}
                onRecoverProject={archived ? onRecoverProject : undefined}
              />
            }
          />
        </Tabs>
      </div>
    </ProjectManagerLayout>
  );
}
