// package: common
// file: rpc/common/response.proto

import * as jspb from "google-protobuf";

export class GeneralServiceResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneralServiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GeneralServiceResponse): GeneralServiceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeneralServiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneralServiceResponse;
  static deserializeBinaryFromReader(message: GeneralServiceResponse, reader: jspb.BinaryReader): GeneralServiceResponse;
}

export namespace GeneralServiceResponse {
  export type AsObject = {
    message: string,
  }
}

