// package: model
// file: model/photo.proto

import * as jspb from "google-protobuf";

export class PhotoResolution extends jspb.Message {
  getHeight(): number;
  setHeight(value: number): void;

  getWidth(): number;
  setWidth(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PhotoResolution.AsObject;
  static toObject(includeInstance: boolean, msg: PhotoResolution): PhotoResolution.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PhotoResolution, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PhotoResolution;
  static deserializeBinaryFromReader(message: PhotoResolution, reader: jspb.BinaryReader): PhotoResolution;
}

export namespace PhotoResolution {
  export type AsObject = {
    height: number,
    width: number,
    size: number,
  }
}

export class Photo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getResolutionsMap(): jspb.Map<string, PhotoResolution>;
  clearResolutionsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Photo.AsObject;
  static toObject(includeInstance: boolean, msg: Photo): Photo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Photo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Photo;
  static deserializeBinaryFromReader(message: Photo, reader: jspb.BinaryReader): Photo;
}

export namespace Photo {
  export type AsObject = {
    name: string,
    resolutionsMap: Array<[string, PhotoResolution.AsObject]>,
  }
}

export class PhotoAndID extends jspb.Message {
  getPhotoid(): string;
  setPhotoid(value: string): void;

  hasPhoto(): boolean;
  clearPhoto(): void;
  getPhoto(): Photo | undefined;
  setPhoto(value?: Photo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PhotoAndID.AsObject;
  static toObject(includeInstance: boolean, msg: PhotoAndID): PhotoAndID.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PhotoAndID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PhotoAndID;
  static deserializeBinaryFromReader(message: PhotoAndID, reader: jspb.BinaryReader): PhotoAndID;
}

export namespace PhotoAndID {
  export type AsObject = {
    photoid: string,
    photo?: Photo.AsObject,
  }
}

