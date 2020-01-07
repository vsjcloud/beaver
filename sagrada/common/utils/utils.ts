// import * as jspb from "google-protobuf";

export function mapEntry<K, V, U>(map: Map<K, V>, cb: (value: V, key: K) => U): U[] {
  const res: U[] = [];
  map.forEach((value, key) => res.push(cb(value, key)));
  return res;
}
