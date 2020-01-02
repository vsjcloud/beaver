import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";

export function jsDateToProtoTimestamp(date: Date): Timestamp {
  const timestamp = new Timestamp();
  timestamp.fromDate(date);
  return timestamp;
}
