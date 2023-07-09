import {
  type CreateUser,
  type DeleteUsers,
  type GetCustomerUsers,
  type UpdateUser,
} from "./types";
import { ApiEndpoints, type ApiResponse, apiService } from "../../service";
import { transformUserData } from "../utils";

export const getCustomerUsers = async (
  customerId: string
): Promise<GetCustomerUsers.Response_Server> => {
  const params: GetCustomerUsers.Params = {
    customerId,
  };

  const response: ApiResponse<GetCustomerUsers.Response_Server> =
    await apiService.get(ApiEndpoints.CUSTOMER_USERS, { params });

  return response.data;
};

export const createUser = async (
  data: CreateUser.Payload
): Promise<CreateUser.Response> => {
  const response: ApiResponse<CreateUser.Response_Server> =
    await apiService.post(ApiEndpoints.CREATE_USER, data);

  return { userData: transformUserData(response.data.userData) };
};

export const updateUser = async (
  data: UpdateUser.Payload
): Promise<UpdateUser.Response> => {
  const response: ApiResponse<UpdateUser.Response_Server> =
    await apiService.post(ApiEndpoints.UPDATE_USER, data);

  return { userData: transformUserData(response.data.userData) };
};

export const deleteUsers = async (
  data: DeleteUsers.Payload
): Promise<DeleteUsers.Response> => {
  const response: ApiResponse<DeleteUsers.Response> = await apiService.post(
    ApiEndpoints.DELETE_USERS,
    data
  );

  return response.data;
};
