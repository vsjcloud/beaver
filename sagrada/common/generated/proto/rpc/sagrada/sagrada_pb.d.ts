// package: sagrada
// file: rpc/sagrada/sagrada.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as model_photo_pb from "../../model/photo_pb";
import * as model_project_pb from "../../model/project_pb";

export class GetProjectDirectoryPagePropsResponse extends jspb.Message {
  getProjectsMap(): jspb.Map<string, model_project_pb.Project>;
  clearProjectsMap(): void;
  getPhotosMap(): jspb.Map<string, model_photo_pb.Photo>;
  clearPhotosMap(): void;
  getProjecttagsMap(): jspb.Map<string, model_project_pb.ProjectTag>;
  clearProjecttagsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectDirectoryPagePropsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectDirectoryPagePropsResponse): GetProjectDirectoryPagePropsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectDirectoryPagePropsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectDirectoryPagePropsResponse;
  static deserializeBinaryFromReader(message: GetProjectDirectoryPagePropsResponse, reader: jspb.BinaryReader): GetProjectDirectoryPagePropsResponse;
}

export namespace GetProjectDirectoryPagePropsResponse {
  export type AsObject = {
    projectsMap: Array<[string, model_project_pb.Project.AsObject]>,
    photosMap: Array<[string, model_photo_pb.Photo.AsObject]>,
    projecttagsMap: Array<[string, model_project_pb.ProjectTag.AsObject]>,
  }
}

export class GetProjectPagePropsRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectPagePropsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectPagePropsRequest): GetProjectPagePropsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectPagePropsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectPagePropsRequest;
  static deserializeBinaryFromReader(message: GetProjectPagePropsRequest, reader: jspb.BinaryReader): GetProjectPagePropsRequest;
}

export namespace GetProjectPagePropsRequest {
  export type AsObject = {
    projectid: string,
  }
}

export class GetProjectPagePropsResponse extends jspb.Message {
  hasProject(): boolean;
  clearProject(): void;
  getProject(): model_project_pb.Project | undefined;
  setProject(value?: model_project_pb.Project): void;

  getPhotosMap(): jspb.Map<string, model_photo_pb.Photo>;
  clearPhotosMap(): void;
  getProjecttagsMap(): jspb.Map<string, model_project_pb.ProjectTag>;
  clearProjecttagsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectPagePropsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectPagePropsResponse): GetProjectPagePropsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectPagePropsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectPagePropsResponse;
  static deserializeBinaryFromReader(message: GetProjectPagePropsResponse, reader: jspb.BinaryReader): GetProjectPagePropsResponse;
}

export namespace GetProjectPagePropsResponse {
  export type AsObject = {
    project?: model_project_pb.Project.AsObject,
    photosMap: Array<[string, model_photo_pb.Photo.AsObject]>,
    projecttagsMap: Array<[string, model_project_pb.ProjectTag.AsObject]>,
  }
}

