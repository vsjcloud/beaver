import axios, {AxiosInstance} from "axios";

import {Config} from "../../config";

export function withAuthToken(authToken: string): AxiosInstance {
  const authAxios = axios.create({
    baseURL: Config.API_URL,
  });
  authAxios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  return authAxios;
}
