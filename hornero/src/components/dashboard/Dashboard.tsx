import React from "react";

import {Project} from "../../generated/proto/model/project_pb";
import {CreateProjectRequest} from "../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../service/project";
import {useAuth0} from "../auth0/Auth0Provider";
import {BaseLayout} from "../layout/BaseLayout";
import ProjectBuilder from "../projectbuilder/ProjectBuilder";

export const Dashboard: React.FC = () => {
  const {token} = useAuth0()!;

  const req = new CreateProjectRequest();
  const project = new Project();
  project.setDescription("Yes");
  req.setProject(project);

  React.useEffect(() => {
    (async (): Promise<void> => {
      console.log(await ProjectService.createProject(token, req));
    })();
  }, [req, token]);

  return (
    <BaseLayout>
      <ProjectBuilder/>
    </BaseLayout>
  );
};
