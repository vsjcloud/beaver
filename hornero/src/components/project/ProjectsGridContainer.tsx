import * as jspb from "google-protobuf";
import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import React from "react";
import {useHistory} from "react-router";

import {ProjectsGrid} from "./ProjectsGrid";

import * as ProjectUtils from "../../utils/project";
import {Photo} from "../../generated/proto/model/photo_pb";
import {Project} from "../../generated/proto/model/project_pb";
import {BulkGetPhotosRequest} from "../../generated/proto/rpc/photo/photo_pb";
import {usePhotoClient} from "../../services/photo";
import {useProjectClient} from "../../services/project";
import {BaseLayout} from "../layout/BaseLayout";

export function ProjectsGridContainer(): React.ReactElement {
  const history = useHistory();

  const projectClient = useProjectClient();
  const photoClient = usePhotoClient();

  const [projects, setProjects] = React.useState<jspb.Map<string, Project>>();
  const [swaps, setSwaps] = React.useState<jspb.Map<string, Project>>();
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
    const response = await projectClient.createEmptyProjectWithSwap(new Empty());
    history.push(`/project/${response.getProjectid()}/build?new=true`);
    setLoading(false);
  }

  return (
    <BaseLayout loading={loading}>
      <ProjectsGrid
        projects={projects!}
        swaps={swaps!}
        photos={photos!}
        onCreateNewProject={onCreateNewProject}
      />
    </BaseLayout>
  );
}
