import {grpc} from "@improbable-eng/grpc-web";
import {NodeHttpTransport} from "@improbable-eng/grpc-web-node-http-transport/lib";
import * as jspb from "google-protobuf";

import * as Config from "../../config";

const GRPC_URL = `${Config.API_URL}/${Config.API_GRPC_PATH}`;

export type GRPCAction<TRequest extends jspb.Message, TResponse extends jspb.Message> = {
  methodDescriptor: grpc.MethodDefinition<TRequest, TResponse>;
  request: TRequest;
}

export function invoke<TRequest extends jspb.Message, TResponse extends jspb.Message>(
  action: GRPCAction<TRequest, TResponse>,
): Promise<TResponse> {
  return new Promise<TResponse>(function (resolve, reject) {
    grpc.invoke(action.methodDescriptor, {
      host: GRPC_URL,
      transport: NodeHttpTransport(),
      request: action.request,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
