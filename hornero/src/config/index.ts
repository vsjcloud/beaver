export const BASE_NAME = reactEnvOrError("BASE_NAME");

export const AUTH0_DOMAIN = reactEnvOrError("AUTH0_DOMAIN");
export const AUTH0_AUDIENCE = reactEnvOrError("AUTH0_AUDIENCE");
export const AUTH0_CLIENT_ID = reactEnvOrError("AUTH0_CLIENT_ID");
export const AUTH0_REDIRECT_URI = reactEnvOrError("AUTH0_REDIRECT_URI");

export const PHOTO_AWS_REGION = reactEnvOrError("PHOTO_AWS_REGION");
export const PHOTO_S3_BUCKET = reactEnvOrError("PHOTO_S3_BUCKET");
export const PHOTO_MAX_UPLOAD_SIZE = parseInt(reactEnvOrError("PHOTO_MAX_UPLOAD_SIZE"));

export const API_URL = reactEnvOrError("API_URL");
export const API_GRPC_PATH = reactEnvOrError("API_GRPC_PATH");

function reactEnvOrError(envKey: string): string {
  envKey = `REACT_APP_${envKey}`;
  const value = process.env[envKey];
  if (value) {
    return value;
  }
  throw Error(`environment variable ${envKey} is not set`);
}
