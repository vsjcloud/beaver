import {Empty} from "google-protobuf/google/protobuf/empty_pb";

import {
  GetProjectDirectoryPagePropsResponse,
  GetProjectPagePropsRequest,
  GetProjectPagePropsResponse,
} from "../../generated/proto/rpc/sagrada/sagrada_pb";
import {SagradaService} from "../../generated/proto/rpc/sagrada/sagrada_pb_service";
import {GRPCClient} from "../grpc";

export async function getProjectDirectoryPageProps(request: Empty): Promise<GetProjectDirectoryPagePropsResponse.AsObject> {
  const response = await GRPCClient.invoke({
    methodDescriptor: SagradaService.getProjectDirectoryPageProps,
    request: request,
  });
  return response.toObject();
}

export async function getProjectPageProps(request: GetProjectPagePropsRequest): Promise<GetProjectPagePropsResponse.AsObject> {
  const response = await GRPCClient.invoke({
    methodDescriptor: SagradaService.getProjectPageProps,
    request: request,
  });
  return response.toObject();
}
