import {GeneralServiceResponse} from "../../generated/proto/rpc/common/response_pb";
import {CreateProjectRequest} from "../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../generated/proto/rpc/project/project_pb_service";
import {GRPCService} from "../grpc";

export function createProject(authToken: string, request: CreateProjectRequest): Promise<GeneralServiceResponse> {
  return GRPCService.invokeWithAuthToken(authToken, {
    methodDescriptor: ProjectService.create,
    request: request,
  });
}
