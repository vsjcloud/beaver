import * as emptyPB from "google-protobuf/google/protobuf/empty_pb";

import {GeneralServiceResponse} from "../../generated/proto/rpc/common/response_pb";
import {
  CreateEmptyProjectWithSwapResponse,
  GetProjectRequest,
  GetProjectResponse,
  GetProjectsResponse,
  UpdateOriginalProjectAndRemoveSwapRequest,
  UpdateProjectRequest,
} from "../../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../../generated/proto/rpc/project/project_pb_service";
import {GRPCService} from "../grpc";

export function createEmptyProjectWithSwap(authToken: string, request: emptyPB.Empty): Promise<CreateEmptyProjectWithSwapResponse> {
  return GRPCService.invokeWithAuthToken(authToken, {
    methodDescriptor: ProjectService.createEmptyProjectWithSwap,
    request: request,
  });
}

export function getProject(authToken: string, request: GetProjectRequest): Promise<GetProjectResponse> {
  return GRPCService.invokeWithAuthToken(authToken, {
    methodDescriptor: ProjectService.getProject,
    request: request,
  });
}

export function getProjects(authToken: string, request: emptyPB.Empty): Promise<GetProjectsResponse> {
  return GRPCService.invokeWithAuthToken(authToken, {
    methodDescriptor: ProjectService.getProjects,
    request: request,
  });
}

export function updateProject(authToken: string, request: UpdateProjectRequest): Promise<GeneralServiceResponse> {
  return GRPCService.invokeWithAuthToken(authToken, {
    methodDescriptor: ProjectService.updateProject,
    request: request,
  });
}

export function updateOriginalProjectAndRemoveSwap(authToken: string, request: UpdateOriginalProjectAndRemoveSwapRequest): Promise<GeneralServiceResponse> {
  return GRPCService.invokeWithAuthToken(authToken, {
    methodDescriptor: ProjectService.updateOriginalProjectAndRemoveSwap,
    request: request,
  });
}
