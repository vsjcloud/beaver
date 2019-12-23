import React from "react";
import {useLocation, useParams} from "react-router";

import {Project} from "../../../generated/proto/model/project_pb";
import {GetProjectWithSwapRequest} from "../../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../../service/project";
import {useAuth0} from "../../auth0/Auth0Provider";
import {BaseLayout} from "../../layout/BaseLayout";

function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export function ProjectBuilder(): React.ReactElement {
  const {token} = useAuth0()!;
  const [loading, setLoading] = React.useState(true);
  const [project, setProject] = React.useState<Project>(new Project());
  const query = useQuery();
  const {projectID} = useParams();

  React.useEffect(() => {
    (async (): Promise<void> => {
      if (!query.get("new") && projectID) {
        const request = new GetProjectWithSwapRequest();
        request.setProjectid(projectID);
        const response = await ProjectService.getProjectWithSwap(token, request);
        if (response.getSwap()) {
          setProject(response.getSwap()!);
        } else {
          setProject(response.getProject()!);
        }
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, projectID]);

  console.log(project);

  return (
    <BaseLayout loading={loading}>
      <div>{project.getName()}</div>
    </BaseLayout>
  );
}
