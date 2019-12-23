import {Button, Card, Colors, H4, Icon, Tag} from "@blueprintjs/core";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {IconNames} from "@blueprintjs/icons";
import classNames from "classnames";
import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";
import React from "react";
import {useHistory} from "react-router";

import {parseID} from "../../core/id";
import {projectSwapID} from "../../core/id/id";
import {Project} from "../../generated/proto/model/project_pb";
import {GRPCService} from "../../service/grpc";
import {ProjectService} from "../../service/project";
import {useAuth0} from "../auth0/Auth0Provider";
import {BaseLayout} from "../layout/BaseLayout";

export function ProjectsGrid(): React.ReactElement {
  const {token} = useAuth0()!;
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState<Map<string, Project>>(new Map());
  const [swaps, setSwaps] = React.useState<Map<string, Project>>(new Map());
  const history = useHistory();

  React.useEffect(() => {
    (async (): Promise<void> => {
      const response = await ProjectService.getProjectsWithSwap(token, new emptyPB.Empty());
      setProjects(GRPCService.pbMapToJSMap<string, Project>(response.getProjectsMap()));
      setSwaps(GRPCService.pbMapToJSMap<string, Project>(response.getSwapsMap()));
      setLoading(false);
    })();
  }, [token]);

  const onCreateNewProject = async (): Promise<void> => {
    const response = await ProjectService.createEmptyProjectWithSwap(token, new emptyPB.Empty());
    history.push(`/project/${response.getProjectid()}/build?new=true`);
  };

  const projectCards = Array.from(projects).reverse().map(([projectID, project]): React.ReactElement => {
    const name = project.getName();
    const description = project.getDescription();
    const featurePhoto = project.getFeaturephotoid() ? "yes" : "";

    const swapID = projectSwapID(parseID(projectID)).toString();
    const swap = swaps.get(swapID);
    const swapName = swap?.getName();
    const swapDescription = swap?.getDescription();
    return (
      <div key={projectID} className="w-1/3 p-2">
        <Card onClick={(): void => history.push(`/project/${projectID}/build`)} interactive={true}>
          {featurePhoto ? (
            <img src={featurePhoto} alt={description}/>
          ) : (
            <div className="flex justify-center items-center" style={{height: "280px", width: "100%"}}>
              <Icon icon={IconNames.OFFICE} color={Colors.GRAY3} iconSize={64}/>
            </div>
          )}
          <H4 className={classNames("flex flex-row items-center", name ? "text-blue-3" : "italic text-gray-3")}>
            <span>{name || swapName || "Tên dự án"}</span>
            {swap && <Tag className="ml-2" intent={Intent.WARNING}>Đang sửa</Tag>}
          </H4>
          <div
            className={classNames(description ? "text-gray-1" : "italic text-gray-3")}>{description || swapDescription || "Giới thiệu về dự án"}</div>
        </Card>
      </div>
    );
  });

  return (
    <BaseLayout loading={loading}>
      <div className="my-2">
        <div className="mt-4 mb-2">
          <Button intent={Intent.PRIMARY} onClick={onCreateNewProject}>Tạo dự án mới</Button>
        </div>
        <div className="flex flex-row flex-wrap -mx-2">
          {projectCards}
        </div>
      </div>
    </BaseLayout>
  );
}
