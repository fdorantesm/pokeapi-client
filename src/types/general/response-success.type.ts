export type ResponseSuccess<T> = {
  requestId: string;
  data: T;
  statuscode: number;
  type: string;
};
