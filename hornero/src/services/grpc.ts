import {grpc} from "@improbable-eng/grpc-web";
import * as jspb from "google-protobuf";

import * as Config from "../config";
import {useAuthToken} from "../utils";

const GRPC_URL = `${Config.API_URL}/${Config.API_GRPC_PATH}`;

export type GRPCAction<TRequest extends jspb.Message, TResponse extends jspb.Message> = {
  methodDescriptor: grpc.MethodDefinition<TRequest, TResponse>;
  request: TRequest;
}

export type GRPCClient = {
  invokeWithMetadata<TRequest extends jspb.Message, TResponse extends jspb.Message>(
    metadata: grpc.Metadata.ConstructorArg,
    action: GRPCAction<TRequest, TResponse>
  ): Promise<TResponse>;
  invokeWithAuthToken<TRequest extends jspb.Message, TResponse extends jspb.Message>(
    action: GRPCAction<TRequest, TResponse>
  ): Promise<TResponse>;
};

export function useGRPCClient(): GRPCClient {
  const authToken = useAuthToken();

  function invokeWithMetadata<TRequest extends jspb.Message, TResponse extends jspb.Message>(
    metadata: grpc.Metadata.ConstructorArg,
    action: GRPCAction<TRequest, TResponse>,
  ): Promise<TResponse> {
    return new Promise<TResponse>(function (resolve, reject) {
      grpc.invoke(action.methodDescriptor, {
        host: GRPC_URL,
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

  function invokeWithAuthToken<TRequest extends jspb.Message, TResponse extends jspb.Message>(
    action: GRPCAction<TRequest, TResponse>,
  ): Promise<TResponse> {
    return invokeWithMetadata({
      "auth-token": authToken,
    }, action);
  }

  return {
    invokeWithMetadata,
    invokeWithAuthToken,
  };
}
