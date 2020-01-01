import {Empty} from "google-protobuf/google/protobuf/empty_pb";

import {useGRPCClient} from "./grpc";

import {GeneralServiceResponse} from "../generated/proto/rpc/common/response_pb";
import {
  ArchiveProjectRequest,
  ArchiveProjectTagRequest,
  CreateProjectResponse,
  CreateProjectTagRequest,
  CreateProjectTagResponse,
  DeleteProjectSwapRequest,
  GetProjectsWithSwapResponse,
  GetProjectTagsResponse,
  GetProjectWithSwapRequest,
  GetProjectWithSwapResponse,
  RecoverProjectRequest,
  RecoverProjectTagRequest,
  UpdateProjectAndRemoveSwapRequest,
  UpdateProjectSwapRequest,
  UpdateProjectTagRequest,
} from "../generated/proto/rpc/project/project_pb";
import {ProjectService} from "../generated/proto/rpc/project/project_pb_service";

export type ProjectClient = {
  createProject(request: Empty): Promise<CreateProjectResponse>;
  getProjectTags(request: Empty): Promise<GetProjectTagsResponse>;
  createProjectTag(request: CreateProjectTagRequest): Promise<CreateProjectTagResponse>;
  updateProjectTag(request: UpdateProjectTagRequest): Promise<GeneralServiceResponse>;
  archiveProjectTag(request: ArchiveProjectTagRequest): Promise<GeneralServiceResponse>;
  recoverProjectTag(request: RecoverProjectTagRequest): Promise<GeneralServiceResponse>;
  getProjectWithSwap(request: GetProjectWithSwapRequest): Promise<GetProjectWithSwapResponse>;
  getProjectsWithSwap(request: Empty): Promise<GetProjectsWithSwapResponse>;
  updateProjectSwap(request: UpdateProjectSwapRequest): Promise<GeneralServiceResponse>;
  deleteProjectSwap(request: DeleteProjectSwapRequest): Promise<GeneralServiceResponse>;
  updateProjectAndRemoveSwap(request: UpdateProjectAndRemoveSwapRequest): Promise<GeneralServiceResponse>;
  archiveProject(request: ArchiveProjectRequest): Promise<GeneralServiceResponse>;
  recoverProject(request: RecoverProjectRequest): Promise<GeneralServiceResponse>;
};

export function useProjectClient(): ProjectClient {
  const grpcClient = useGRPCClient();

  function createProject(request: Empty): Promise<CreateProjectResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.createProject,
      request: request,
    });
  }

  function getProjectTags(request: Empty): Promise<GetProjectTagsResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.getProjectTags,
      request: request,
    });
  }

  function createProjectTag(request: CreateProjectTagRequest): Promise<CreateProjectTagResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.createProjectTag,
      request: request,
    });
  }

  function updateProjectTag(request: UpdateProjectTagRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.updateProjectTag,
      request: request,
    });
  }

  function archiveProjectTag(request: ArchiveProjectTagRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.archiveProjectTag,
      request: request,
    });
  }

  function recoverProjectTag(request: RecoverProjectTagRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.recoverProjectTag,
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

  function updateProjectSwap(request: UpdateProjectSwapRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.updateProjectSwap,
      request: request,
    });
  }

  function deleteProjectSwap(request: DeleteProjectSwapRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.deleteProjectSwap,
      request: request,
    });
  }

  function updateProjectAndRemoveSwap(request: UpdateProjectAndRemoveSwapRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.updateProjectAndRemoveSwap,
      request: request,
    });
  }

  function archiveProject(request: ArchiveProjectRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.archiveProject,
      request: request,
    });
  }

  function recoverProject(request: RecoverProjectRequest): Promise<GeneralServiceResponse> {
    return grpcClient.invokeWithAuthToken({
      methodDescriptor: ProjectService.recoverProject,
      request: request,
    });
  }

  return {
    createProject,
    getProjectTags,
    createProjectTag,
    updateProjectTag,
    archiveProjectTag,
    recoverProjectTag,
    getProjectWithSwap,
    getProjectsWithSwap,
    updateProjectSwap,
    deleteProjectSwap,
    updateProjectAndRemoveSwap,
    archiveProject,
    recoverProject,
  };
}
