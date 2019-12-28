import {Empty} from "google-protobuf/google/protobuf/empty_pb";

import {useGRPCClient} from "./grpc";

import {GeneralServiceResponse} from "../generated/proto/rpc/common/response_pb";
import {
  CreateEmptyProjectWithSwapResponse,
  GetProjectsWithSwapResponse,
  GetProjectWithSwapRequest,
  GetProjectWithSwapResponse,
  UpdateOriginalProjectAndRemoveSwapRequest,
  UpdateProjectRequest,
} from "../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../generated/proto/rpc/project/project_pb_service";

export type ProjectClient = {
  createEmptyProjectWithSwap(request: Empty): Promise<CreateEmptyProjectWithSwapResponse>;
  getProjectWithSwap(request: GetProjectWithSwapRequest): Promise<GetProjectWithSwapResponse>;
  getProjectsWithSwap(request: Empty): Promise<GetProjectsWithSwapResponse>;
  updateProject(request: UpdateProjectRequest): Promise<GeneralServiceResponse>;
  updateOriginalProjectAndRemoveSwap(request: UpdateOriginalProjectAndRemoveSwapRequest): Promise<GeneralServiceResponse>;
};

export function useProjectClient(): ProjectClient {
  const grpcClient = useGRPCClient();

  function createEmptyProjectWithSwap(request: Empty): Promise<CreateEmptyProjectWithSwapResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.createEmptyProjectWithSwap,
      request: request,
    });
  }

  function getProjectWithSwap(request: GetProjectWithSwapRequest): Promise<GetProjectWithSwapResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.getProjectWithSwap,
      request: request,
    });
  }

  function getProjectsWithSwap(request: Empty): Promise<GetProjectsWithSwapResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.getProjectsWithSwap,
      request: request,
    });
  }

  function updateProject(request: UpdateProjectRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.updateProject,
      request: request,
    });
  }

  function updateOriginalProjectAndRemoveSwap(request: UpdateOriginalProjectAndRemoveSwapRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.updateOriginalProjectAndRemoveSwap,
      request: request,
    });
  }

  return {
    createEmptyProjectWithSwap,
    getProjectWithSwap,
    getProjectsWithSwap,
    updateProject,
    updateOriginalProjectAndRemoveSwap,
  };
}
