import { type AxiosError, type AxiosResponse } from "axios";

export type ApiResponse<T = any, D = any> = AxiosResponse<T, D>;
export type ApiError<T = any, D = any> = AxiosError<T, D>;

export type ResponseMiddleware = {
  onSuccess?: (response: ApiResponse) => void;
  onError?: (error: ApiError) => void;
};
