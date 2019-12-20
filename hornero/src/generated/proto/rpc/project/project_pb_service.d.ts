// package: project
// file: rpc/project/project.proto

import * as rpc_project_project_pb from "../../rpc/project/project_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ProjectServicecreateEmptyProjectWithSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.CreateEmptyProjectWithSwapResponse;
};

type ProjectServicegetProject = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.GetProjectRequest;
  readonly responseType: typeof rpc_project_project_pb.GetProjectResponse;
};

type ProjectServicegetProjects = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_project_project_pb.GetProjectsResponse;
};

type ProjectServiceupdateProject = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.UpdateProjectRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

type ProjectServiceupdateOriginalProjectAndRemoveSwap = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.UpdateOriginalProjectAndRemoveSwapRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

export class ProjectService {
  static readonly serviceName: string;
  static readonly createEmptyProjectWithSwap: ProjectServicecreateEmptyProjectWithSwap;
  static readonly getProject: ProjectServicegetProject;
  static readonly getProjects: ProjectServicegetProjects;
  static readonly updateProject: ProjectServiceupdateProject;
  static readonly updateOriginalProjectAndRemoveSwap: ProjectServiceupdateOriginalProjectAndRemoveSwap;
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
  createEmptyProjectWithSwap(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.CreateEmptyProjectWithSwapResponse|null) => void
  ): UnaryResponse;
  createEmptyProjectWithSwap(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.CreateEmptyProjectWithSwapResponse|null) => void
  ): UnaryResponse;
  getProject(
    requestMessage: rpc_project_project_pb.GetProjectRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectResponse|null) => void
  ): UnaryResponse;
  getProject(
    requestMessage: rpc_project_project_pb.GetProjectRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectResponse|null) => void
  ): UnaryResponse;
  getProjects(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectsResponse|null) => void
  ): UnaryResponse;
  getProjects(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_project_project_pb.GetProjectsResponse|null) => void
  ): UnaryResponse;
  updateProject(
    requestMessage: rpc_project_project_pb.UpdateProjectRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateProject(
    requestMessage: rpc_project_project_pb.UpdateProjectRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateOriginalProjectAndRemoveSwap(
    requestMessage: rpc_project_project_pb.UpdateOriginalProjectAndRemoveSwapRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  updateOriginalProjectAndRemoveSwap(
    requestMessage: rpc_project_project_pb.UpdateOriginalProjectAndRemoveSwapRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
}

