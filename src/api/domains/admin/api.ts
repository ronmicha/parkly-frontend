import { type GetUser } from "../users";
import { type CreateUserPayload, type GetCustomerUsers } from "./types";
import { ApiEndpoints, type ApiResponse, apiService } from "../../service";
import { transformUserData } from "../utils";

export const getCustomerUsers =
  async (): Promise<GetCustomerUsers.Response_Server> => {
    const response: ApiResponse<GetCustomerUsers.Response_Server> =
      await apiService.get(ApiEndpoints.CUSTOMER_USERS);

    return response.data;
  };

export const createUser = async (
  data: CreateUserPayload
): Promise<GetUser.Response> => {
  const response: ApiResponse<GetUser.Response_Server> = await apiService.post(
    ApiEndpoints.CREATE_USER,
    data
  );

  return { userData: transformUserData(response.data.userData) };
};
