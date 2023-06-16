import { ApiEndpoints, apiService } from "../common";
import { type GetUser } from "./types";

export const getUser = async (): Promise<GetUser.Response_Server> => {
  const response = await apiService.get<GetUser.Response_Server>(
    ApiEndpoints.USER_DATA
  );
  return response.data;
};
