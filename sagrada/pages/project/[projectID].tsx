import {NextPage} from "next";
import React from "react";

import {
  GetProjectPagePropsRequest,
  GetProjectPagePropsResponse,
} from "../../common/generated/proto/rpc/sagrada/sagrada_pb";
import {SagradaClient} from "../../common/services/sagrada";
import {Project} from "../../components/sagrada/projects/project/Project";

export type ProjectPageProps = {
  props: GetProjectPagePropsResponse.AsObject;
};

const ProjectPage: NextPage<ProjectPageProps> = ({props}: ProjectPageProps) => {
  return (
    <Project
      project={props.project!}
      photos={new Map(props.photosMap)}
      tags={new Map(props.projecttagsMap)}
    />
  );
};

ProjectPage.getInitialProps = async ({query}): Promise<ProjectPageProps> => {
  const {projectID} = query;
  const request = new GetProjectPagePropsRequest();
  if (typeof projectID === "string") {
    request.setProjectid(projectID);
  }
  return {
    props: await SagradaClient.getProjectPageProps(request),
  };
};

export default ProjectPage;
