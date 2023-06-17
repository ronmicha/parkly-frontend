import { ApiEndpoints, apiService } from "../common";
import { type CreateUserPayload, type GetUser } from "./types";
import { type AxiosResponse } from "axios";

export const createUser = async (
  data: CreateUserPayload
): Promise<GetUser.Response_Server> => {
  const response: AxiosResponse<GetUser.Response_Server> =
    await apiService.post(ApiEndpoints.CREATE_USER, data);

  return response.data;
};

export const getUser = async (): Promise<GetUser.Response_Server> => {
  const response: AxiosResponse<GetUser.Response_Server> = await apiService.get(
    ApiEndpoints.GET_USER
  );

  return response.data;
};
