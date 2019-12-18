// package: project
// file: rpc/project/project.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as model_project_pb from "../../model/project_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";

export class CreateEmptyProjectWithSwapResponse extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  getSwapid(): string;
  setSwapid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateEmptyProjectWithSwapResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateEmptyProjectWithSwapResponse): CreateEmptyProjectWithSwapResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateEmptyProjectWithSwapResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateEmptyProjectWithSwapResponse;
  static deserializeBinaryFromReader(message: CreateEmptyProjectWithSwapResponse, reader: jspb.BinaryReader): CreateEmptyProjectWithSwapResponse;
}

export namespace CreateEmptyProjectWithSwapResponse {
  export type AsObject = {
    projectid: string,
    swapid: string,
  }
}

export class UpdateProjectRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  hasProject(): boolean;
  clearProject(): void;
  getProject(): model_project_pb.Project | undefined;
  setProject(value?: model_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectRequest): UpdateProjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectRequest;
  static deserializeBinaryFromReader(message: UpdateProjectRequest, reader: jspb.BinaryReader): UpdateProjectRequest;
}

export namespace UpdateProjectRequest {
  export type AsObject = {
    projectid: string,
    project?: model_project_pb.Project.AsObject,
  }
}

export class UpdateOriginalProjectAndRemoveSwapRequest extends jspb.Message {
  getSwapid(): string;
  setSwapid(value: string): void;

  getProjectid(): string;
  setProjectid(value: string): void;

  hasProject(): boolean;
  clearProject(): void;
  getProject(): model_project_pb.Project | undefined;
  setProject(value?: model_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateOriginalProjectAndRemoveSwapRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateOriginalProjectAndRemoveSwapRequest): UpdateOriginalProjectAndRemoveSwapRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateOriginalProjectAndRemoveSwapRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateOriginalProjectAndRemoveSwapRequest;
  static deserializeBinaryFromReader(message: UpdateOriginalProjectAndRemoveSwapRequest, reader: jspb.BinaryReader): UpdateOriginalProjectAndRemoveSwapRequest;
}

export namespace UpdateOriginalProjectAndRemoveSwapRequest {
  export type AsObject = {
    swapid: string,
    projectid: string,
    project?: model_project_pb.Project.AsObject,
  }
}

export class DeleteProjectRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProjectRequest): DeleteProjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProjectRequest;
  static deserializeBinaryFromReader(message: DeleteProjectRequest, reader: jspb.BinaryReader): DeleteProjectRequest;
}

export namespace DeleteProjectRequest {
  export type AsObject = {
    projectid: string,
  }
}

