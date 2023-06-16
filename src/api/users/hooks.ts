/* eslint-disable @typescript-eslint/naming-convention */
import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../common";
import { getUser } from "./api";
import { type GetUser } from "./types";

const transformGetUserResponse = (
  response: GetUser.Response_Server
): GetUser.Response => {
  const {
    id,
    first_name,
    last_name,
    phone_number,
    customer_id,
    active_vehicle_id,
  } = response.userData;

  return {
    userData: {
      id,
      firstName: first_name,
      lastName: last_name,
      phoneNumber: phone_number,
      customerId: customer_id,
      vehicleId: active_vehicle_id,
    },
  };
};

export const useGetUser = (
  options: UseQueryOptions = {}
): UseQueryResult<GetUser.Response> => {
  const queryClient = useQueryClient();
  const queryKey = [QueryKeys.USER_DATA];

  return useQuery<unknown, unknown, GetUser.Response>(queryKey, getUser, {
    ...options,
    select: transformGetUserResponse,
    initialData: () => queryClient.getQueryData<GetUser.Response>(queryKey),
  });
};
