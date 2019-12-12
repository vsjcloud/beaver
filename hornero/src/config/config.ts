export const BASE_NAME = envOrError("REACT_APP_BASE_NAME");

export const AUTH0_DOMAIN = envOrError("REACT_APP_AUTH0_DOMAIN");
export const AUTH0_AUDIENCE = envOrError("REACT_APP_AUTH0_AUDIENCE");
export const AUTH0_CLIENT_ID = envOrError("REACT_APP_AUTH0_CLIENT_ID");
export const AUTH0_REDIRECT_URI = envOrError("REACT_APP_AUTH0_REDIRECT_URI");

export const API_URL = envOrError("REACT_APP_API_URL");
export const API_GRPC_PATH = envOrError("REACT_APP_API_GRPC_PATH");

function envOrError(envKey: string): string {
  const value = process.env[envKey];
  if (value) {
    return value;
  }
  throw Error(`environment variable ${envKey} is not set`);
}
