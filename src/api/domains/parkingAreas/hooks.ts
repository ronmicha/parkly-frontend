import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../../queryClient";
import { getCustomerParkingAreas } from "./api";
import { type GetCustomerParkingAreas } from "./types";

const transformGetCustomerParkingAreasResponse = (
  response: GetCustomerParkingAreas.Response_Server
): GetCustomerParkingAreas.Response => {
  return {
    parkingAreas: response.parkingAreas.map((pa) => ({
      id: pa.id,
      name: pa.name,
      streetAddress: pa.street_address,
      city: pa.city,
    })),
  };
};

export const useGetCustomerParkingAreas = (
  params: GetCustomerParkingAreas.Params,
  options: UseQueryOptions<
    GetCustomerParkingAreas.Response_Server,
    unknown,
    GetCustomerParkingAreas.Response
  > = {}
): UseQueryResult<GetCustomerParkingAreas.Response> => {
  const { customerId } = params;

  return useQuery<
    GetCustomerParkingAreas.Response_Server,
    unknown,
    GetCustomerParkingAreas.Response
  >(
    [QueryKeys.PARKING_AREAS, customerId],
    async () => await getCustomerParkingAreas(customerId),
    { ...options, select: transformGetCustomerParkingAreasResponse }
  );
};
