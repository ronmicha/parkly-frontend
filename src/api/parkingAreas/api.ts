import { ApiEndpoints, apiService } from "../common";
import { type GetCustomerParkingAreas } from "./types";

export const getCustomerParkingAreas = async (
  customerId: string
): Promise<GetCustomerParkingAreas.Response_Server> => {
  const params: GetCustomerParkingAreas.Params = {
    customerId,
  };
  const response =
    await apiService.get<GetCustomerParkingAreas.Response_Server>(
      ApiEndpoints.CUSTOMER_PARKING_AREAS,
      { params }
    );
  return response.data;
};
