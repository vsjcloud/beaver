function envOrError(envKey: string): string {
  const value = process.env[envKey];
  if (value) {
    return value;
  }
  throw Error(`environment variable ${envKey} is not set`);
}

export const API_HOST = envOrError("REACT_APP_API_HOST");
export const GRPC_API_PATH = envOrError("REACT_APP_GRPC_API_PATH");
