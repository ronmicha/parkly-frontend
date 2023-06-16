import { ApiEndpoints, apiService } from "../common";
import { type GetCustomerParkingAreas } from "./types";
import { type AxiosResponse } from "axios";

export const getCustomerParkingAreas = async (
  customerId: string
): Promise<GetCustomerParkingAreas.Response_Server> => {
  const params: GetCustomerParkingAreas.Params = {
    customerId,
  };
  const response: AxiosResponse<GetCustomerParkingAreas.Response_Server> =
    await apiService.get(ApiEndpoints.CUSTOMER_PARKING_AREAS, { params });

  return response.data;
};
