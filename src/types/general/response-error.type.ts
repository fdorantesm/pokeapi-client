export type ResposeError = {
  requestId: string;
  timestamp: string;
  path: string;
  cause: string;
  statuscode: number;
  error: string;
  message: string;
};
