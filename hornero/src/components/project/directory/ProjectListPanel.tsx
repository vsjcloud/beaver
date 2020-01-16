import {Button, Intent, Tab, Tabs} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import * as jspb from "google-protobuf";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import React from "react";
import {useHistory} from "react-router";

import {ActiveProjectsPanel} from "./ActiveProjectsPanel";
import {ArchivedProjectsPanel} from "./ArchivedProjectsPanel";
import {TabPanelLayout} from "./TabPanelLayout";

import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";
import {BulkGetPhotosRequest} from "../../../generated/proto/rpc/photo/photo_pb";
import {usePhotoClient} from "../../../services/photo";
import {useProjectClient} from "../../../services/project";
import * as ProjectUtils from "../../../utils/project";

export function ProjectListPanel(): React.ReactElement {
  const history = useHistory();

  const projectClient = useProjectClient();
  const photoClient = usePhotoClient();

  const [swaps, setSwaps] = React.useState<jspb.Map<string, Project>>();
  const [activeProjects, setActiveProjects] = React.useState<jspb.Map<string, Project>>();
  const [archivedProjects, setArchivedProjects] = React.useState<jspb.Map<string, Project>>();
  const [photos, setPhotos] = React.useState<jspb.Map<string, Photo>>();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(function () {
    (async function (): Promise<void> {
      const [projects, swaps] = await async function (): Promise<[jspb.Map<string, Project>, jspb.Map<string, Project>]> {
        const response = await projectClient.getProjectsWithSwap(new Empty());
        return [response.getProjectsMap(), response.getSwapsMap()];
      }();
      setSwaps(swaps);

      const archivedProjectIDs = await async function (): Promise<jspb.Map<string, boolean>> {
        const response = await projectClient.getArchivedProjectDirectory(new Empty());
        return response.getArchivedprojectdirectory()?.getProjectidsMap() || new jspb.Map([]);
      }();
      const [activeProjects, archivedProjects] = function (): [jspb.Map<string, Project>, jspb.Map<string, Project>] {
        const activeProjects = new jspb.Map<string, Project>([]);
        const archivedProjects = new jspb.Map<string, Project>([]);
        projects.forEach((project, projectID) => {
          if (archivedProjectIDs.has(projectID)) {
            archivedProjects.set(projectID, project);
          } else {
            activeProjects.set(projectID, project);
          }
        });
        return [activeProjects, archivedProjects];
      }();
      setActiveProjects(activeProjects);
      setArchivedProjects(archivedProjects);

      const photos = await async function (): Promise<jspb.Map<string, Photo>> {
        const request = new BulkGetPhotosRequest();
        projects.forEach((project) => {
          ProjectUtils.updatePhotoSetWithProjectFeaturePhoto(request.getPhotoidsMap(), project);
        });
        swaps.forEach((swap) => {
          ProjectUtils.updatePhotoSetWithProjectFeaturePhoto(request.getPhotoidsMap(), swap);
        });
        return (await photoClient.bulkGetPhotos(request)).getPhotosMap();
      }();
      setPhotos(photos);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCreateNewProject(): Promise<void> {
    setLoading(true);
    const response = await projectClient.createProject(new Empty());
    history.push(`/project/${response.getProjectid()}`);
  }

  return (
    <TabPanelLayout loading={loading}>
      <Tabs id="ProjectListPanel" className="w-full">
        <Tab
          id="ActiveProjects"
          title="Danh sách dự án"
          panelClassName="mt-2"
          panel={
            <ActiveProjectsPanel
              projects={activeProjects!}
              swaps={swaps!}
              photos={photos!}
              onCreateNewProject={onCreateNewProject}
            />
          }
        />
        <Tab
          id="ArchivedProjects"
          title="Danh sách lưu trữ"
          panelClassName="mt-2"
          panel={
            <ArchivedProjectsPanel
              projects={archivedProjects!}
              swaps={swaps!}
              photos={photos!}
            />
          }
        />
        <Tabs.Expander/>
        <Button icon={IconNames.ADD} intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
      </Tabs>
    </TabPanelLayout>
  );
}
