import { ApiEndpoints, apiService, type ApiResponse } from "../../service";
import { type GetCustomerParkingAreas } from "./types";

export const getCustomerParkingAreas = async (
  customerId: string
): Promise<GetCustomerParkingAreas.Response_Server> => {
  const params: GetCustomerParkingAreas.Params = {
    customerId,
  };
  const response: ApiResponse<GetCustomerParkingAreas.Response_Server> =
    await apiService.get(ApiEndpoints.PARKING_AREAS, { params });

  return response.data;
};
