export type ApiResponse<T> = {
  data: T | null;
  errors: string[] | null;
  message: string;
  statusCode: number;
};
