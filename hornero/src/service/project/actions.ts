import {invokeGRPCAction} from "../../common/grpc";
import {GeneralServiceResponse} from "../../generated/proto/rpc/common/response_pb";
import {CreateProjectRequest} from "../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../generated/proto/rpc/project/project_pb_service";

export function createProject(request: CreateProjectRequest): Promise<GeneralServiceResponse> {
  return invokeGRPCAction({
    methodDescriptor: ProjectService.create,
    metadata: {
      authorization: "Bearer 123",
    },
    request: request,
  });
}
