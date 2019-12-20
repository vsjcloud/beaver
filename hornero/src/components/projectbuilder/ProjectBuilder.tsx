import {Intent, Spinner} from "@blueprintjs/core";
import React from "react";
import {useHistory, useLocation, useParams} from "react-router";

import {Project} from "../../generated/proto/model/project_pb";
import {GetProjectRequest} from "../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../service/project";
import {useAuth0} from "../auth0/Auth0Provider";
import {BaseLayout} from "../layout/BaseLayout";
import {AppToaster} from "../toaster/AppToaster";

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
        const request = new GetProjectRequest();
        request.setProjectid(projectID);
        const response = await ProjectService.getProject(token, request);
        setProject(response.getProject()!);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, projectID]);

  return (
    <BaseLayout>
      {loading ? (
        <div className="flex justify-center items-center" style={{height: "calc(100vh - 50px)"}}>
          <Spinner intent={Intent.PRIMARY}/>
        </div>
      ) : (
        <div>Hello</div>
      )}
    </BaseLayout>
  );
}
