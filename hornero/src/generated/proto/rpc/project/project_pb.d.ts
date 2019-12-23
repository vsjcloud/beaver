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

export class GetProjectWithSwapRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectWithSwapRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectWithSwapRequest): GetProjectWithSwapRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectWithSwapRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectWithSwapRequest;
  static deserializeBinaryFromReader(message: GetProjectWithSwapRequest, reader: jspb.BinaryReader): GetProjectWithSwapRequest;
}

export namespace GetProjectWithSwapRequest {
  export type AsObject = {
    projectid: string,
  }
}

export class GetProjectWithSwapResponse extends jspb.Message {
  hasProject(): boolean;
  clearProject(): void;
  getProject(): model_project_pb.Project | undefined;
  setProject(value?: model_project_pb.Project): void;

  hasSwap(): boolean;
  clearSwap(): void;
  getSwap(): model_project_pb.Project | undefined;
  setSwap(value?: model_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectWithSwapResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectWithSwapResponse): GetProjectWithSwapResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectWithSwapResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectWithSwapResponse;
  static deserializeBinaryFromReader(message: GetProjectWithSwapResponse, reader: jspb.BinaryReader): GetProjectWithSwapResponse;
}

export namespace GetProjectWithSwapResponse {
  export type AsObject = {
    project?: model_project_pb.Project.AsObject,
    swap?: model_project_pb.Project.AsObject,
  }
}

export class GetProjectsWithSwapResponse extends jspb.Message {
  getProjectsMap(): jspb.Map<string, model_project_pb.Project>;
  clearProjectsMap(): void;
  getSwapsMap(): jspb.Map<string, model_project_pb.Project>;
  clearSwapsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectsWithSwapResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectsWithSwapResponse): GetProjectsWithSwapResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectsWithSwapResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectsWithSwapResponse;
  static deserializeBinaryFromReader(message: GetProjectsWithSwapResponse, reader: jspb.BinaryReader): GetProjectsWithSwapResponse;
}

export namespace GetProjectsWithSwapResponse {
  export type AsObject = {
    projectsMap: Array<[string, model_project_pb.Project.AsObject]>,
    swapsMap: Array<[string, model_project_pb.Project.AsObject]>,
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

