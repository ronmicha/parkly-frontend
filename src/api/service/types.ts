import { type AxiosResponse } from "axios";

export type ApiResponse<T = any, D = any> = AxiosResponse<T, D>;

export type ResponseMiddleware = (config: ApiResponse) => void;
