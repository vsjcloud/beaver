// package: model
// file: model/project.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class ProjectInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProjectInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ProjectInfo): ProjectInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProjectInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProjectInfo;
  static deserializeBinaryFromReader(message: ProjectInfo, reader: jspb.BinaryReader): ProjectInfo;
}

export namespace ProjectInfo {
  export type AsObject = {
    name: string,
    value: string,
  }
}

export class ProjectPhoto extends jspb.Message {
  getPhotoid(): string;
  setPhotoid(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProjectPhoto.AsObject;
  static toObject(includeInstance: boolean, msg: ProjectPhoto): ProjectPhoto.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProjectPhoto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProjectPhoto;
  static deserializeBinaryFromReader(message: ProjectPhoto, reader: jspb.BinaryReader): ProjectPhoto;
}

export namespace ProjectPhoto {
  export type AsObject = {
    photoid: string,
    description: string,
  }
}

export class ProjectTag extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProjectTag.AsObject;
  static toObject(includeInstance: boolean, msg: ProjectTag): ProjectTag.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProjectTag, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProjectTag;
  static deserializeBinaryFromReader(message: ProjectTag, reader: jspb.BinaryReader): ProjectTag;
}

export namespace ProjectTag {
  export type AsObject = {
    name: string,
  }
}

export class Project extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  clearDetailsList(): void;
  getDetailsList(): Array<ProjectInfo>;
  setDetailsList(value: Array<ProjectInfo>): void;
  addDetails(value?: ProjectInfo, index?: number): ProjectInfo;

  hasStartdate(): boolean;
  clearStartdate(): void;
  getStartdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setStartdate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasFinishdate(): boolean;
  clearFinishdate(): void;
  getFinishdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setFinishdate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasFeaturephoto(): boolean;
  clearFeaturephoto(): void;
  getFeaturephoto(): ProjectPhoto | undefined;
  setFeaturephoto(value?: ProjectPhoto): void;

  clearAlbumphotosList(): void;
  getAlbumphotosList(): Array<ProjectPhoto>;
  setAlbumphotosList(value: Array<ProjectPhoto>): void;
  addAlbumphotos(value?: ProjectPhoto, index?: number): ProjectPhoto;

  getTagidsMap(): jspb.Map<string, string>;
  clearTagidsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Project.AsObject;
  static toObject(includeInstance: boolean, msg: Project): Project.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Project, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Project;
  static deserializeBinaryFromReader(message: Project, reader: jspb.BinaryReader): Project;
}

export namespace Project {
  export type AsObject = {
    name: string,
    description: string,
    detailsList: Array<ProjectInfo.AsObject>,
    startdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    finishdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    featurephoto?: ProjectPhoto.AsObject,
    albumphotosList: Array<ProjectPhoto.AsObject>,
    tagidsMap: Array<[string, string]>,
  }
}

export class ArchivedProjectDirectory extends jspb.Message {
  getProjectidsMap(): jspb.Map<string, boolean>;
  clearProjectidsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchivedProjectDirectory.AsObject;
  static toObject(includeInstance: boolean, msg: ArchivedProjectDirectory): ArchivedProjectDirectory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchivedProjectDirectory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchivedProjectDirectory;
  static deserializeBinaryFromReader(message: ArchivedProjectDirectory, reader: jspb.BinaryReader): ArchivedProjectDirectory;
}

export namespace ArchivedProjectDirectory {
  export type AsObject = {
    projectidsMap: Array<[string, boolean]>,
  }
}

export class ArchivedProjectTagDirectory extends jspb.Message {
  getProjecttagidsMap(): jspb.Map<string, boolean>;
  clearProjecttagidsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArchivedProjectTagDirectory.AsObject;
  static toObject(includeInstance: boolean, msg: ArchivedProjectTagDirectory): ArchivedProjectTagDirectory.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArchivedProjectTagDirectory, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArchivedProjectTagDirectory;
  static deserializeBinaryFromReader(message: ArchivedProjectTagDirectory, reader: jspb.BinaryReader): ArchivedProjectTagDirectory;
}

export namespace ArchivedProjectTagDirectory {
  export type AsObject = {
    projecttagidsMap: Array<[string, boolean]>,
  }
}

