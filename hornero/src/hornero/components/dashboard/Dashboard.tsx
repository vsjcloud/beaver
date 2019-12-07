import {Button} from "@blueprintjs/core";
import React from "react";

import {Project} from "../../../generated/proto/models/project_pb";
import {CreateProjectRequest} from "../../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../../service/project";
import BaseLayout from "../layout/BaseLayout";

export default class Dashboard extends React.PureComponent {
  public render(): React.ReactNode {
    const req = new CreateProjectRequest();
    const project = new Project();
    project.setName("Project name hihi haha");
    req.setProject(project);
    return (
      <BaseLayout>
        {/*<ProjectBuilder/>*/}
        <Button onClick={() => ProjectService.createProject(req)}>Hello</Button>
      </BaseLayout>
    );
  }
}
