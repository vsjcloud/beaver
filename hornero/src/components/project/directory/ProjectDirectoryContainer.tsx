import {Tab, Tabs} from "@blueprintjs/core";
import * as jspb from "google-protobuf";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import React from "react";
import {useHistory} from "react-router";

import {ProjectListPanel} from "./ProjectListPanel";

import {Photo} from "../../../generated/proto/model/photo_pb";
import {Project} from "../../../generated/proto/model/project_pb";
import {BulkGetPhotosRequest} from "../../../generated/proto/rpc/photo/photo_pb";
import {usePhotoClient} from "../../../services/photo";
import {useProjectClient} from "../../../services/project";
import * as ProjectUtils from "../../../utils/project";
import {BaseLayout} from "../../layout/BaseLayout";


export function ProjectDirectoryContainer(): React.ReactElement {
  const history = useHistory();

  const projectClient = useProjectClient();
  const photoClient = usePhotoClient();

  const [projects, setProjects] = React.useState<jspb.Map<string, Project>>();
  const [swaps, setSwaps] = React.useState<jspb.Map<string, Project>>();
  const [archivedProjectIDs, setArchivedProjectIDs] = React.useState<jspb.Map<string, boolean>>();
  const [photos, setPhotos] = React.useState<jspb.Map<string, Photo>>();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(function () {
    (async function (): Promise<void> {
      const [projects, swaps] = await async function (): Promise<[jspb.Map<string, Project>, jspb.Map<string, Project>]> {
        const response = await projectClient.getProjectsWithSwap(new Empty());
        return [response.getProjectsMap(), response.getSwapsMap()];
      }();
      setProjects(projects);
      setSwaps(swaps);
      const archivedProjectIDs = await async function(): Promise<jspb.Map<string, boolean>> {
        const response = await projectClient.getArchivedProjectDirectory(new Empty());
        return response.getArchivedprojectdirectory()?.getProjectidsMap() || new jspb.Map([]);
      }();
      setArchivedProjectIDs(archivedProjectIDs);
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
    <BaseLayout loading={loading}>
      <Tabs id="ProjectDirectory" vertical={true}>
        <Tab
          id="ProjectList"
          title="Dự án"
          className="w-full"
          panel={
            <ProjectListPanel
              projects={projects!}
              swaps={swaps!}
              archivedProjectIDs={archivedProjectIDs!}
              photos={photos!}
              onCreateNewProject={onCreateNewProject}
            />
          }
        />
        <Tab
          id="TagList"
          title="Thẻ"
        />
        <div style={{width: "200px"}}/>
      </Tabs>
    </BaseLayout>
  );
}
