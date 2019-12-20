// package: project
// file: rpc/project/project.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as model_project_pb from "../../model/project_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";

export class CreateEmptyProjectWithSwapResponse extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

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
  }
}

export class GetProjectRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectRequest): GetProjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectRequest;
  static deserializeBinaryFromReader(message: GetProjectRequest, reader: jspb.BinaryReader): GetProjectRequest;
}

export namespace GetProjectRequest {
  export type AsObject = {
    projectid: string,
  }
}

export class GetProjectResponse extends jspb.Message {
  hasProject(): boolean;
  clearProject(): void;
  getProject(): model_project_pb.Project | undefined;
  setProject(value?: model_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectResponse): GetProjectResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectResponse;
  static deserializeBinaryFromReader(message: GetProjectResponse, reader: jspb.BinaryReader): GetProjectResponse;
}

export namespace GetProjectResponse {
  export type AsObject = {
    project?: model_project_pb.Project.AsObject,
  }
}

export class GetProjectsResponse extends jspb.Message {
  getProjectsMap(): jspb.Map<string, model_project_pb.Project>;
  clearProjectsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectsResponse): GetProjectsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectsResponse;
  static deserializeBinaryFromReader(message: GetProjectsResponse, reader: jspb.BinaryReader): GetProjectsResponse;
}

export namespace GetProjectsResponse {
  export type AsObject = {
    projectsMap: Array<[string, model_project_pb.Project.AsObject]>,
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
    projectid: string,
    project?: model_project_pb.Project.AsObject,
  }
}

