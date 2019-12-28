import axios, {AxiosInstance} from "axios";

import * as Config from "../config";
import {useAuthToken} from "../utils";

export function useAuthAxios(): AxiosInstance {
  const authToken = useAuthToken();
  const authAxios = axios.create({
    baseURL: Config.API_URL,
  });
  authAxios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  return authAxios;
}
