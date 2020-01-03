// package: project
// file: rpc/project/project.proto

import * as rpc_project_project_pb from "../../rpc/project/project_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ProjectServicecreateProject = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.CreateProjectResponse;
};

type ProjectServicegetProjectTags = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.GetProjectTagsResponse;
};

type ProjectServicecreateProjectTag = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.CreateProjectTagRequest;
  readonly responseType: typeof rpc_project_project_pb.CreateProjectTagResponse;
};

type ProjectServiceupdateProjectTag = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.UpdateProjectTagRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServicegetArchivedProjectTagDirectory = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.GetArchivedProjectTagDirectoryResponse;
};

type ProjectServicearchiveProjectTag = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.ArchiveProjectTagRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServicerecoverProjectTag = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.RecoverProjectTagRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServicegetProjectWithSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.GetProjectWithSwapRequest;
  readonly responseType: typeof rpc_project_project_pb.GetProjectWithSwapResponse;
};

type ProjectServicegetProjectsWithSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.GetProjectsWithSwapResponse;
};

type ProjectServiceupdateProjectSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.UpdateProjectSwapRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServicedeleteProjectSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.DeleteProjectSwapRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServiceupdateProjectAndRemoveSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.UpdateProjectAndRemoveSwapRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServicegetArchivedProjectDirectory = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.GetArchivedProjectDirectoryResponse;
};

type ProjectServicearchiveProject = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.ArchiveProjectRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServicerecoverProject = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.RecoverProjectRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

export class ProjectService {
  static readonly serviceName: string;
  static readonly createProject: ProjectServicecreateProject;
  static readonly getProjectTags: ProjectServicegetProjectTags;
  static readonly createProjectTag: ProjectServicecreateProjectTag;
  static readonly updateProjectTag: ProjectServiceupdateProjectTag;
  static readonly getArchivedProjectTagDirectory: ProjectServicegetArchivedProjectTagDirectory;
  static readonly archiveProjectTag: ProjectServicearchiveProjectTag;
  static readonly recoverProjectTag: ProjectServicerecoverProjectTag;
  static readonly getProjectWithSwap: ProjectServicegetProjectWithSwap;
  static readonly getProjectsWithSwap: ProjectServicegetProjectsWithSwap;
  static readonly updateProjectSwap: ProjectServiceupdateProjectSwap;
  static readonly deleteProjectSwap: ProjectServicedeleteProjectSwap;
  static readonly updateProjectAndRemoveSwap: ProjectServiceupdateProjectAndRemoveSwap;
  static readonly getArchivedProjectDirectory: ProjectServicegetArchivedProjectDirectory;
  static readonly archiveProject: ProjectServicearchiveProject;
  static readonly recoverProject: ProjectServicerecoverProject;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ProjectServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  createProject(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.CreateProjectResponse|null) => void
  ): UnaryResponse;
  createProject(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.CreateProjectResponse|null) => void
  ): UnaryResponse;
  getProjectTags(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectTagsResponse|null) => void
  ): UnaryResponse;
  getProjectTags(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectTagsResponse|null) => void
  ): UnaryResponse;
  createProjectTag(
    requestMessage: rpc_project_project_pb.CreateProjectTagRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.CreateProjectTagResponse|null) => void
  ): UnaryResponse;
  createProjectTag(
    requestMessage: rpc_project_project_pb.CreateProjectTagRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.CreateProjectTagResponse|null) => void
  ): UnaryResponse;
  updateProjectTag(
    requestMessage: rpc_project_project_pb.UpdateProjectTagRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateProjectTag(
    requestMessage: rpc_project_project_pb.UpdateProjectTagRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  getArchivedProjectTagDirectory(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetArchivedProjectTagDirectoryResponse|null) => void
  ): UnaryResponse;
  getArchivedProjectTagDirectory(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetArchivedProjectTagDirectoryResponse|null) => void
  ): UnaryResponse;
  archiveProjectTag(
    requestMessage: rpc_project_project_pb.ArchiveProjectTagRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  archiveProjectTag(
    requestMessage: rpc_project_project_pb.ArchiveProjectTagRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  recoverProjectTag(
    requestMessage: rpc_project_project_pb.RecoverProjectTagRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  recoverProjectTag(
    requestMessage: rpc_project_project_pb.RecoverProjectTagRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  getProjectWithSwap(
    requestMessage: rpc_project_project_pb.GetProjectWithSwapRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectWithSwapResponse|null) => void
  ): UnaryResponse;
  getProjectWithSwap(
    requestMessage: rpc_project_project_pb.GetProjectWithSwapRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectWithSwapResponse|null) => void
  ): UnaryResponse;
  getProjectsWithSwap(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectsWithSwapResponse|null) => void
  ): UnaryResponse;
  getProjectsWithSwap(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectsWithSwapResponse|null) => void
  ): UnaryResponse;
  updateProjectSwap(
    requestMessage: rpc_project_project_pb.UpdateProjectSwapRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateProjectSwap(
    requestMessage: rpc_project_project_pb.UpdateProjectSwapRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  deleteProjectSwap(
    requestMessage: rpc_project_project_pb.DeleteProjectSwapRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  deleteProjectSwap(
    requestMessage: rpc_project_project_pb.DeleteProjectSwapRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateProjectAndRemoveSwap(
    requestMessage: rpc_project_project_pb.UpdateProjectAndRemoveSwapRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateProjectAndRemoveSwap(
    requestMessage: rpc_project_project_pb.UpdateProjectAndRemoveSwapRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  getArchivedProjectDirectory(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetArchivedProjectDirectoryResponse|null) => void
  ): UnaryResponse;
  getArchivedProjectDirectory(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetArchivedProjectDirectoryResponse|null) => void
  ): UnaryResponse;
  archiveProject(
    requestMessage: rpc_project_project_pb.ArchiveProjectRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  archiveProject(
    requestMessage: rpc_project_project_pb.ArchiveProjectRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  recoverProject(
    requestMessage: rpc_project_project_pb.RecoverProjectRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  recoverProject(
    requestMessage: rpc_project_project_pb.RecoverProjectRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
}

