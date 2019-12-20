import {grpc} from "@improbable-eng/grpc-web";
import * as pb from "google-protobuf";

import {Config} from "../../config";

const grpcURL = `${Config.API_URL}/${Config.API_GRPC_PATH}`;

export type GRPCAction<TRequest extends pb.Message, TResponse extends pb.Message> = {
  methodDescriptor: grpc.MethodDefinition<TRequest, TResponse>;
  request: TRequest;
}

export async function invokeWithMetadata<TRequest extends pb.Message, TResponse extends pb.Message>(
  metadata: grpc.Metadata.ConstructorArg,
  action: GRPCAction<TRequest, TResponse>,
): Promise<TResponse> {
  return new Promise<TResponse>(function (resolve, reject) {
    grpc.invoke(action.methodDescriptor, {
      host: grpcURL,
      metadata: metadata,
      request: action.request,
      onHeaders: () => {},
      onMessage: (response: TResponse) => resolve(response),
      onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
        if (code !== grpc.Code.OK) {
          return reject({code, message, trailers});
        }
      },
    });
  });
}

export async function invokeWithAuthToken<TRequest extends pb.Message, TResponse extends pb.Message>(
  authToken: string,
  action: GRPCAction<TRequest, TResponse>,
): Promise<TResponse> {
  return invokeWithMetadata({
    "auth-token": authToken,
  }, action);
}

export function pbMapToJSMap<K, V>(m: pb.Map<K, V>): Map<K, V> {
  const result = new Map<K, V>();
  m.forEach((v, k) => result.set(k, v));
  return result;
}
