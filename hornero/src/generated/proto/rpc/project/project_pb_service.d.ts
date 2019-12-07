// package: project
// file: rpc/project/project.proto

import * as rpc_project_project_pb from "../../rpc/project/project_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ProjectServicecreate = {
  readonly methodName: string;
  readonly service: typeof ProjectService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_project_project_pb.CreateProjectRequest;
  readonly responseType: typeof rpc_common_response_pb.GeneralServiceResponse;
};

export class ProjectService {
  static readonly serviceName: string;
  static readonly create: ProjectServicecreate;
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
  create(
    requestMessage: rpc_project_project_pb.CreateProjectRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
  create(
    requestMessage: rpc_project_project_pb.CreateProjectRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_common_response_pb.GeneralServiceResponse|null) => void
  ): UnaryResponse;
}

