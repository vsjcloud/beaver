// package: sagrada
// file: rpc/sagrada/sagrada.proto

import * as rpc_sagrada_sagrada_pb from "../../rpc/sagrada/sagrada_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SagradaServicegetProjectDirectoryPageProps = {
  readonly methodName: string;
  readonly service: typeof SagradaService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_empty_pb.Empty;
  readonly responseType: typeof rpc_sagrada_sagrada_pb.GetProjectDirectoryPagePropsResponse;
};

type SagradaServicegetProjectPageProps = {
  readonly methodName: string;
  readonly service: typeof SagradaService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_sagrada_sagrada_pb.GetProjectPagePropsRequest;
  readonly responseType: typeof rpc_sagrada_sagrada_pb.GetProjectPagePropsResponse;
};

export class SagradaService {
  static readonly serviceName: string;
  static readonly getProjectDirectoryPageProps: SagradaServicegetProjectDirectoryPageProps;
  static readonly getProjectPageProps: SagradaServicegetProjectPageProps;
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

export class SagradaServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getProjectDirectoryPageProps(
    requestMessage: google_protobuf_empty_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_sagrada_sagrada_pb.GetProjectDirectoryPagePropsResponse|null) => void
  ): UnaryResponse;
  getProjectDirectoryPageProps(
    requestMessage: google_protobuf_empty_pb.Empty,
    callback: (error: ServiceError|null, responseMessage: rpc_sagrada_sagrada_pb.GetProjectDirectoryPagePropsResponse|null) => void
  ): UnaryResponse;
  getProjectPageProps(
    requestMessage: rpc_sagrada_sagrada_pb.GetProjectPagePropsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_sagrada_sagrada_pb.GetProjectPagePropsResponse|null) => void
  ): UnaryResponse;
  getProjectPageProps(
    requestMessage: rpc_sagrada_sagrada_pb.GetProjectPagePropsRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_sagrada_sagrada_pb.GetProjectPagePropsResponse|null) => void
  ): UnaryResponse;
}

