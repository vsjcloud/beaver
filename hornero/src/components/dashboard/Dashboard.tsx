import {Button, Card} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";
import React from "react";
import {useHistory} from "react-router";

import {Project} from "../../generated/proto/model/project_pb";
import {ProjectService} from "../../service/project";
import {useAuth0} from "../auth0/Auth0Provider";
import {BaseLayout} from "../layout/BaseLayout";

export function Dashboard(): React.ReactElement {
  const {token} = useAuth0()!;
  const [projects, setProjects] = React.useState<Array<[string, Project]>>([]);
  const history = useHistory();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const response = await ProjectService.getProjects(token, new emptyPB.Empty());
      setProjects(response.getProjectsMap().toArray());
    })();
  }, [token]);

  const onCreateNewProject = async (): Promise<void> => {
    const response = await ProjectService.createEmptyProjectWithSwap(token, new emptyPB.Empty());
    history.push(`/project/build/${response.getProjectid()}?new=true`);
  };

  const projectCards = projects.map(([projectID, project]): React.ReactElement => {
    return (
      <Card key={projectID}>
        <div>{projectID}</div>
        <div>{project}</div>
      </Card>
    );
  });

  return (
    <BaseLayout>
      <div className="my-2">
        <div>
          <Button intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
        </div>
        <div className="flex flex-row">
          {projectCards}
        </div>
      </div>
    </BaseLayout>
  );
}
