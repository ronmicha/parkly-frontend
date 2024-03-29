import {
  type CreateParkingSlot,
  type CreateUser,
  type DeleteParkingSlots,
  type DeleteUsers,
  type GetCustomerUsers,
  type UpdateParkingSlot,
  type UpdateUser,
} from "./types";
import { ApiEndpoints, type ApiResponse, apiService } from "../../service";
import { transformParkingSlot, transformUserData } from "../utils";

export const getCustomerUsers = async (
  customerId: string
): Promise<GetCustomerUsers.Response_Server> => {
  const params: GetCustomerUsers.Params = {
    customerId,
  };

  const response: ApiResponse<GetCustomerUsers.Response_Server> =
    await apiService.get(ApiEndpoints.ADMIN_CUSTOMER_USERS, { params });

  return response.data;
};

// region users

export const createUser = async (
  data: CreateUser.Payload
): Promise<CreateUser.Response> => {
  const response: ApiResponse<CreateUser.Response_Server> =
    await apiService.post(ApiEndpoints.ADMIN_CREATE_USER, data);

  return { userData: transformUserData(response.data.userData) };
};

export const updateUser = async (
  data: UpdateUser.Payload
): Promise<UpdateUser.Response> => {
  const response: ApiResponse<UpdateUser.Response_Server> =
    await apiService.post(ApiEndpoints.ADMIN_UPDATE_USER, data);

  return { userData: transformUserData(response.data.userData) };
};

export const deleteUsers = async (
  data: DeleteUsers.Payload
): Promise<DeleteUsers.Response> => {
  const response: ApiResponse<DeleteUsers.Response> = await apiService.post(
    ApiEndpoints.ADMIN_DELETE_USERS,
    data
  );

  return response.data;
};

// endregion

// region parking slots

export const createParkingSlot = async (
  data: CreateParkingSlot.Payload
): Promise<CreateParkingSlot.Response> => {
  const response: ApiResponse<CreateParkingSlot.Response_Server> =
    await apiService.post(ApiEndpoints.ADMIN_CREATE_SLOT, data);

  return { slot: transformParkingSlot(response.data.slot) };
};

export const updateParkingSlot = async (
  data: UpdateParkingSlot.Payload
): Promise<UpdateParkingSlot.Response> => {
  const response: ApiResponse<UpdateParkingSlot.Response_Server> =
    await apiService.post(ApiEndpoints.ADMIN_UPDATE_SLOT, data);

  return { slot: transformParkingSlot(response.data.slot) };
};

export const deleteParkingSlots = async (
  data: DeleteParkingSlots.Payload
): Promise<DeleteParkingSlots.Response> => {
  const response: ApiResponse<DeleteParkingSlots.Response> =
    await apiService.post(ApiEndpoints.ADMIN_DELETE_SLOTS, data);

  return response.data;
};

// endregion
