/* eslint-disable @typescript-eslint/naming-convention */
import { ApiEndpoints, type ApiResponse, apiService } from "../../service";
import { type CreateUserPayload, type GetUser, type Login } from "./types";

export const transformUserData = (
  response: GetUser.Response_Server
): GetUser.Response => {
  const {
    id,
    first_name,
    last_name,
    phone_number,
    email,
    password,
    customer_id,
    active_vehicle_id,
  } = response.userData;

  return {
    userData: {
      id,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      email,
      password,
      customerId: customer_id,
      activeVehicleId: active_vehicle_id,
    },
  };
};

export const login = async (data: Login.Payload): Promise<Login.Response> => {
  const response: ApiResponse<Login.Response_Server> = await apiService.post(
    ApiEndpoints.LOGIN,
    data
  );

  return transformUserData(response.data);
};

export const createUser = async (
  data: CreateUserPayload
): Promise<GetUser.Response> => {
  const response: ApiResponse<GetUser.Response_Server> = await apiService.post(
    ApiEndpoints.CREATE_USER,
    data
  );

  return transformUserData(response.data);
};

export const getProfile = async (): Promise<GetUser.Response_Server> => {
  const response: ApiResponse<GetUser.Response_Server> = await apiService.get(
    ApiEndpoints.GET_PROFILE
  );

  return response.data;
};
