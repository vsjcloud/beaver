import {grpc} from "@improbable-eng/grpc-web";
import * as pb from "google-protobuf";

import {Config} from "../config";

export interface GRPCAction<TRequest extends pb.Message, TResponse extends pb.Message> {
  methodDescriptor: grpc.MethodDefinition<TRequest, TResponse>;
  metadata?: grpc.Metadata.ConstructorArg;
  request: TRequest;
}

const grpcHost = `${Config.API_HOST}/${Config.GRPC_API_PATH}`;

export function invokeGRPCAction<TRequest extends pb.Message, TResponse extends pb.Message>(action: GRPCAction<TRequest, TResponse>): Promise<TResponse> {
  return new Promise<TResponse>(function (resolve, reject) {
    grpc.invoke(action.methodDescriptor, {
      host: grpcHost,
      metadata: action.metadata,
      request: action.request,
      onHeaders: headers => {},
      onMessage: (response: TResponse) => resolve(response),
      onEnd: (code, message, trailers) => {},
    });
  });
}
