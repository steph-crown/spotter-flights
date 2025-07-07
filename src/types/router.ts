export interface RouteErrorInfo {
  error: Error;
  errorInfo: React.ErrorInfo;
}

export interface LocationState {
  from?: Location;
  message?: string;
}
