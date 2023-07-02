import { ApiEndpoints, type ApiResponse, apiService } from "../../service";
import { type GetUser, type Login } from "./types";
import { transformUserData } from "../utils";

export const login = async (data: Login.Payload): Promise<Login.Response> => {
  const response: ApiResponse<Login.Response_Server> = await apiService.post(
    ApiEndpoints.LOGIN,
    data
  );

  return { userData: transformUserData(response.data.userData) };
};

export const getProfile = async (): Promise<GetUser.Response_Server> => {
  const response: ApiResponse<GetUser.Response_Server> = await apiService.get(
    ApiEndpoints.PROFILE
  );

  return response.data;
};
