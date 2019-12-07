// package: project
// file: rpc/project/project.proto

import * as jspb from "google-protobuf";
import * as models_project_pb from "../../models/project_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";

export class CreateProjectRequest extends jspb.Message {
  hasProject(): boolean;
  clearProject(): void;
  getProject(): models_project_pb.Project | undefined;
  setProject(value?: models_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProjectRequest): CreateProjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProjectRequest;
  static deserializeBinaryFromReader(message: CreateProjectRequest, reader: jspb.BinaryReader): CreateProjectRequest;
}

export namespace CreateProjectRequest {
  export type AsObject = {
    project?: models_project_pb.Project.AsObject,
  }
}

