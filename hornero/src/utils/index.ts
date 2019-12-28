import React from "react";
import * as jspb from "google-protobuf";
import {Intent} from "@blueprintjs/core";
import {useHistory, useLocation} from "react-router";

import {useAuth0} from "../components/auth0/Auth0Provider";
import {AppToaster} from "../components/toaster/AppToaster";

export function useAuthToken(): string {
  return useAuth0()?.token || "";
}

export function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export function useErrHandler(): (err: string) => void {
  const history = useHistory();

  return function (err: string): void {
    AppToaster.show({
      intent: Intent.DANGER,
      message: err,
    });

    history.replace("/");
  };
}

export function pbMapTransform<K, V, U>(map: jspb.Map<K, V>, cb: (value: V, key: K) => U): U[] {
  const res: U[] = [];
  map.forEach((value, key) => res.push(cb(value, key)));
  return res;
}

export function onStringChange(cb: (newValue: string) => void): (event: React.ChangeEvent<HTMLInputElement>) => void {
  return function (event: React.ChangeEvent<HTMLInputElement>): void {
    cb(event.target.value);
  }
}
