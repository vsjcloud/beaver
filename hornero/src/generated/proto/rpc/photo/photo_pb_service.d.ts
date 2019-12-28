// package: photo
// file: rpc/photo/photo.proto

import * as rpc_photo_photo_pb from "../../rpc/photo/photo_pb";
import {grpc} from "@improbable-eng/grpc-web";

type PhotoServicegetPhoto = {
  readonly methodName: string;
  readonly service: typeof PhotoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_photo_photo_pb.GetPhotoRequest;
  readonly responseType: typeof rpc_photo_photo_pb.GetPhotoResponse;
};

type PhotoServicebulkGetPhotos = {
  readonly methodName: string;
  readonly service: typeof PhotoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof rpc_photo_photo_pb.BulkGetPhotosRequest;
  readonly responseType: typeof rpc_photo_photo_pb.BulkGetPhotosResponse;
};

export class PhotoService {
  static readonly serviceName: string;
  static readonly getPhoto: PhotoServicegetPhoto;
  static readonly bulkGetPhotos: PhotoServicebulkGetPhotos;
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

export class PhotoServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getPhoto(
    requestMessage: rpc_photo_photo_pb.GetPhotoRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_photo_photo_pb.GetPhotoResponse|null) => void
  ): UnaryResponse;
  getPhoto(
    requestMessage: rpc_photo_photo_pb.GetPhotoRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_photo_photo_pb.GetPhotoResponse|null) => void
  ): UnaryResponse;
  bulkGetPhotos(
    requestMessage: rpc_photo_photo_pb.BulkGetPhotosRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: rpc_photo_photo_pb.BulkGetPhotosResponse|null) => void
  ): UnaryResponse;
  bulkGetPhotos(
    requestMessage: rpc_photo_photo_pb.BulkGetPhotosRequest,
    callback: (error: ServiceError|null, responseMessage: rpc_photo_photo_pb.BulkGetPhotosResponse|null) => void
  ): UnaryResponse;
}

