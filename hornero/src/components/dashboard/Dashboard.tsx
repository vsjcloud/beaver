import {Button, Card, Spinner} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";
import React from "react";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

import {Project} from "../../generated/proto/model/project_pb";
import {GRPCService} from "../../service/grpc";
import {ProjectService} from "../../service/project";
import {useAuth0} from "../auth0/Auth0Provider";
import {BaseLayout} from "../layout/BaseLayout";

export function Dashboard(): React.ReactElement {
  const {token} = useAuth0()!;
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState<Map<string, Project>>(new Map());
  const history = useHistory();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const response = await ProjectService.getProjects(token, new emptyPB.Empty());
      setProjects(GRPCService.pbMapToJSMap<string, Project>(response.getProjectsMap()));
      setLoading(false);
    })();
  }, [token]);

  const onCreateNewProject = async (): Promise<void> => {
    const response = await ProjectService.createEmptyProjectWithSwap(token, new emptyPB.Empty());
    history.push(`/project/build/${response.getProjectid()}?new=true`);
  };

  const projectCards = Array.from(projects).map(([projectID, project]): React.ReactElement => {
    return (
      <div key={projectID} className="w-1/3 p-2">
        <Card>
          <div>{projectID}</div>
          <Link to={`/project/build/${projectID}`}>Sửa nội dung</Link>
        </Card>
      </div>
    );
  });

  return (
    <BaseLayout>
      {loading ? (
        <div className="flex justify-center items-center" style={{height: "calc(100vh - 50px)"}}>
          <Spinner intent={Intent.PRIMARY}/>
        </div>
      ) : (
        <div className="my-2">
          <div>
            <Button intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
          </div>
          <div className="flex flex-row flex-wrap">
            {projectCards}
          </div>
        </div>
      )}
    </BaseLayout>
  );
}
