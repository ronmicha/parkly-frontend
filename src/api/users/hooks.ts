/* eslint-disable @typescript-eslint/naming-convention */
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../common";
import { createUser, getUser } from "./api";
import { type CreateUserPayload, type GetUser } from "./types";

const transformGetUserResponse = (
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

export const useCreateUser = (
  options: UseMutationOptions<
    GetUser.Response_Server,
    unknown,
    CreateUserPayload
  > = {}
): UseMutationResult => {
  return useMutation<GetUser.Response_Server, unknown, CreateUserPayload>({
    ...options,
    mutationFn: createUser,
    mutationKey: [QueryKeys.USER_DATA],
  });
};

export const useGetUser = (
  options: UseQueryOptions = {}
): UseQueryResult<GetUser.Response> => {
  const queryKey = [QueryKeys.USER_DATA];

  return useQuery<unknown, unknown, GetUser.Response>(queryKey, getUser, {
    ...options,
    select: transformGetUserResponse,
  });
};
