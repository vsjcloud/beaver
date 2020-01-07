import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {DateTime} from "luxon";

export function pbTimestampObjectToLuxonDateTime(timestamp?: Timestamp.AsObject): DateTime | null {
  if (!timestamp) return null;
  const t = new Timestamp();
  t.setSeconds(timestamp.seconds);
  t.setNanos(timestamp.nanos);
  return DateTime.fromJSDate(t.toDate());
}
