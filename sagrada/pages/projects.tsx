import {Empty} from "google-protobuf/google/protobuf/empty_pb";
import {NextPage} from "next";
import React from "react";

import {GetProjectDirectoryPagePropsResponse} from "../common/generated/proto/rpc/sagrada/sagrada_pb";
import {SagradaClient} from "../common/services/sagrada";
import {ProjectDirectory} from "../components/sagrada/projects/directory/ProjectDirectory";

export type ProjectsPageProps = {
  props: GetProjectDirectoryPagePropsResponse.AsObject;
};

const ProjectDirectoryPage: NextPage<ProjectsPageProps> = ({props}: ProjectsPageProps) => {
  return (
    <ProjectDirectory
      projects={new Map(props.projectsMap)}
      photos={new Map(props.photosMap)}
      tags={new Map(props.projecttagsMap)}
    />
  );
};

ProjectDirectoryPage.getInitialProps = async (): Promise<ProjectsPageProps> => {
  return {
    props: await SagradaClient.getProjectDirectoryPageProps(new Empty()),
  };
};

export default ProjectDirectoryPage;
