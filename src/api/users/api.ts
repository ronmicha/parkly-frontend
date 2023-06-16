import { ApiEndpoints, apiService } from "../common";
import { type CreateUserPayload, type GetUser } from "./types";
import { type AxiosResponse } from "axios";

export const createUser = async (data: CreateUserPayload): Promise<void> => {
  await apiService.post(ApiEndpoints.USER_DATA, data);
};

export const getUser = async (): Promise<GetUser.Response_Server> => {
  const response: AxiosResponse<GetUser.Response_Server> = await apiService.get(
    ApiEndpoints.USER_DATA
  );

  return response.data;
};
