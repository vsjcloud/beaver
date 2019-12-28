// package: photo
// file: rpc/photo/photo.proto

import * as jspb from "google-protobuf";
import * as model_photo_pb from "../../model/photo_pb";

export class GetPhotoRequest extends jspb.Message {
  getPhotoid(): string;
  setPhotoid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPhotoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetPhotoRequest): GetPhotoRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPhotoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPhotoRequest;
  static deserializeBinaryFromReader(message: GetPhotoRequest, reader: jspb.BinaryReader): GetPhotoRequest;
}

export namespace GetPhotoRequest {
  export type AsObject = {
    photoid: string,
  }
}

export class GetPhotoResponse extends jspb.Message {
  hasPhoto(): boolean;
  clearPhoto(): void;
  getPhoto(): model_photo_pb.Photo | undefined;
  setPhoto(value?: model_photo_pb.Photo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetPhotoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetPhotoResponse): GetPhotoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetPhotoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetPhotoResponse;
  static deserializeBinaryFromReader(message: GetPhotoResponse, reader: jspb.BinaryReader): GetPhotoResponse;
}

export namespace GetPhotoResponse {
  export type AsObject = {
    photo?: model_photo_pb.Photo.AsObject,
  }
}

export class BulkGetPhotosRequest extends jspb.Message {
  getPhotoidsMap(): jspb.Map<string, boolean>;
  clearPhotoidsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BulkGetPhotosRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BulkGetPhotosRequest): BulkGetPhotosRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BulkGetPhotosRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BulkGetPhotosRequest;
  static deserializeBinaryFromReader(message: BulkGetPhotosRequest, reader: jspb.BinaryReader): BulkGetPhotosRequest;
}

export namespace BulkGetPhotosRequest {
  export type AsObject = {
    photoidsMap: Array<[string, boolean]>,
  }
}

export class BulkGetPhotosResponse extends jspb.Message {
  getPhotosMap(): jspb.Map<string, model_photo_pb.Photo>;
  clearPhotosMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BulkGetPhotosResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BulkGetPhotosResponse): BulkGetPhotosResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BulkGetPhotosResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BulkGetPhotosResponse;
  static deserializeBinaryFromReader(message: BulkGetPhotosResponse, reader: jspb.BinaryReader): BulkGetPhotosResponse;
}

export namespace BulkGetPhotosResponse {
  export type AsObject = {
    photosMap: Array<[string, model_photo_pb.Photo.AsObject]>,
  }
}

