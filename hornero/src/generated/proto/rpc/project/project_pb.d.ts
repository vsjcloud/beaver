// package: project
// file: rpc/project/project.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as model_project_pb from "../../model/project_pb";
import * as rpc_common_response_pb from "../../rpc/common/response_pb";

export class CreateProjectResponse extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProjectResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProjectResponse): CreateProjectResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateProjectResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProjectResponse;
  static deserializeBinaryFromReader(message: CreateProjectResponse, reader: jspb.BinaryReader): CreateProjectResponse;
}

export namespace CreateProjectResponse {
  export type AsObject = {
    projectid: string,
  }
}

export class GetProjectTagsResponse extends jspb.Message {
  getTagsMap(): jspb.Map<string, model_project_pb.ProjectTag>;
  clearTagsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProjectTagsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProjectTagsResponse): GetProjectTagsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetProjectTagsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProjectTagsResponse;
  static deserializeBinaryFromReader(message: GetProjectTagsResponse, reader: jspb.BinaryReader): GetProjectTagsResponse;
}

export namespace GetProjectTagsResponse {
  export type AsObject = {
    tagsMap: Array<[string, model_project_pb.ProjectTag.AsObject]>,
  }
}

export class CreateProjectTagRequest extends jspb.Message {
  hasProjecttag(): boolean;
  clearProjecttag(): void;
  getProjecttag(): model_project_pb.ProjectTag | undefined;
  setProjecttag(value?: model_project_pb.ProjectTag): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProjectTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProjectTagRequest): CreateProjectTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateProjectTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProjectTagRequest;
  static deserializeBinaryFromReader(message: CreateProjectTagRequest, reader: jspb.BinaryReader): CreateProjectTagRequest;
}

export namespace CreateProjectTagRequest {
  export type AsObject = {
    projecttag?: model_project_pb.ProjectTag.AsObject,
  }
}

export class UpdateProjectTagRequest extends jspb.Message {
  getProjecttagid(): string;
  setProjecttagid(value: string): void;

  hasProjecttag(): boolean;
  clearProjecttag(): void;
  getProjecttag(): model_project_pb.ProjectTag | undefined;
  setProjecttag(value?: model_project_pb.ProjectTag): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectTagRequest): UpdateProjectTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProjectTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectTagRequest;
  static deserializeBinaryFromReader(message: UpdateProjectTagRequest, reader: jspb.BinaryReader): UpdateProjectTagRequest;
}

export namespace UpdateProjectTagRequest {
  export type AsObject = {
    projecttagid: string,
    projecttag?: model_project_pb.ProjectTag.AsObject,
  }
}

export class CreateProjectTagResponse extends jspb.Message {
  getProjecttagid(): string;
  setProjecttagid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateProjectTagResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateProjectTagResponse): CreateProjectTagResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateProjectTagResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateProjectTagResponse;
  static deserializeBinaryFromReader(message: CreateProjectTagResponse, reader: jspb.BinaryReader): CreateProjectTagResponse;
}

export namespace CreateProjectTagResponse {
  export type AsObject = {
    projecttagid: string,
  }
}

export class GetArchivedProjectTagDirectoryResponse extends jspb.Message {
  hasArchivedprojecttagdirectory(): boolean;
  clearArchivedprojecttagdirectory(): void;
  getArchivedprojecttagdirectory(): model_project_pb.ArchivedProjectTagDirectory | undefined;
  setArchivedprojecttagdirectory(value?: model_project_pb.ArchivedProjectTagDirectory): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetArchivedProjectTagDirectoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetArchivedProjectTagDirectoryResponse): GetArchivedProjectTagDirectoryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetArchivedProjectTagDirectoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetArchivedProjectTagDirectoryResponse;
  static deserializeBinaryFromReader(message: GetArchivedProjectTagDirectoryResponse, reader: jspb.BinaryReader): GetArchivedProjectTagDirectoryResponse;
}

export namespace GetArchivedProjectTagDirectoryResponse {
  export type AsObject = {
    archivedprojecttagdirectory?: model_project_pb.ArchivedProjectTagDirectory.AsObject,
  }
}

export class ArchiveProjectTagRequest extends jspb.Message {
  getProjecttagid(): string;
  setProjecttagid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveProjectTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveProjectTagRequest): ArchiveProjectTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchiveProjectTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveProjectTagRequest;
  static deserializeBinaryFromReader(message: ArchiveProjectTagRequest, reader: jspb.BinaryReader): ArchiveProjectTagRequest;
}

export namespace ArchiveProjectTagRequest {
  export type AsObject = {
    projecttagid: string,
  }
}

export class RecoverProjectTagRequest extends jspb.Message {
  getProjecttagid(): string;
  setProjecttagid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoverProjectTagRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecoverProjectTagRequest): RecoverProjectTagRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecoverProjectTagRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoverProjectTagRequest;
  static deserializeBinaryFromReader(message: RecoverProjectTagRequest, reader: jspb.BinaryReader): RecoverProjectTagRequest;
}

export namespace RecoverProjectTagRequest {
  export type AsObject = {
    projecttagid: string,
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

export class UpdateProjectSwapRequest extends jspb.Message {
  getSwapid(): string;
  setSwapid(value: string): void;

  hasSwap(): boolean;
  clearSwap(): void;
  getSwap(): model_project_pb.Project | undefined;
  setSwap(value?: model_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectSwapRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectSwapRequest): UpdateProjectSwapRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProjectSwapRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectSwapRequest;
  static deserializeBinaryFromReader(message: UpdateProjectSwapRequest, reader: jspb.BinaryReader): UpdateProjectSwapRequest;
}

export namespace UpdateProjectSwapRequest {
  export type AsObject = {
    swapid: string,
    swap?: model_project_pb.Project.AsObject,
  }
}

export class DeleteProjectSwapRequest extends jspb.Message {
  getSwapid(): string;
  setSwapid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteProjectSwapRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteProjectSwapRequest): DeleteProjectSwapRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteProjectSwapRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteProjectSwapRequest;
  static deserializeBinaryFromReader(message: DeleteProjectSwapRequest, reader: jspb.BinaryReader): DeleteProjectSwapRequest;
}

export namespace DeleteProjectSwapRequest {
  export type AsObject = {
    swapid: string,
  }
}

export class UpdateProjectAndRemoveSwapRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  hasProject(): boolean;
  clearProject(): void;
  getProject(): model_project_pb.Project | undefined;
  setProject(value?: model_project_pb.Project): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateProjectAndRemoveSwapRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateProjectAndRemoveSwapRequest): UpdateProjectAndRemoveSwapRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UpdateProjectAndRemoveSwapRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateProjectAndRemoveSwapRequest;
  static deserializeBinaryFromReader(message: UpdateProjectAndRemoveSwapRequest, reader: jspb.BinaryReader): UpdateProjectAndRemoveSwapRequest;
}

export namespace UpdateProjectAndRemoveSwapRequest {
  export type AsObject = {
    projectid: string,
    project?: model_project_pb.Project.AsObject,
  }
}

export class GetArchivedProjectDirectoryResponse extends jspb.Message {
  hasArchivedprojectdirectory(): boolean;
  clearArchivedprojectdirectory(): void;
  getArchivedprojectdirectory(): model_project_pb.ArchivedProjectDirectory | undefined;
  setArchivedprojectdirectory(value?: model_project_pb.ArchivedProjectDirectory): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetArchivedProjectDirectoryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetArchivedProjectDirectoryResponse): GetArchivedProjectDirectoryResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetArchivedProjectDirectoryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetArchivedProjectDirectoryResponse;
  static deserializeBinaryFromReader(message: GetArchivedProjectDirectoryResponse, reader: jspb.BinaryReader): GetArchivedProjectDirectoryResponse;
}

export namespace GetArchivedProjectDirectoryResponse {
  export type AsObject = {
    archivedprojectdirectory?: model_project_pb.ArchivedProjectDirectory.AsObject,
  }
}

export class ArchiveProjectRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchiveProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ArchiveProjectRequest): ArchiveProjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchiveProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchiveProjectRequest;
  static deserializeBinaryFromReader(message: ArchiveProjectRequest, reader: jspb.BinaryReader): ArchiveProjectRequest;
}

export namespace ArchiveProjectRequest {
  export type AsObject = {
    projectid: string,
  }
}

export class RecoverProjectRequest extends jspb.Message {
  getProjectid(): string;
  setProjectid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RecoverProjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RecoverProjectRequest): RecoverProjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RecoverProjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RecoverProjectRequest;
  static deserializeBinaryFromReader(message: RecoverProjectRequest, reader: jspb.BinaryReader): RecoverProjectRequest;
}

export namespace RecoverProjectRequest {
  export type AsObject = {
    projectid: string,
  }
}

