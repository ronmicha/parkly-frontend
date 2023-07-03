import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { createUser, getCustomerUsers } from "./api";
import { type GetUser } from "../users";
import { type CreateUserPayload, type GetCustomerUsers } from "./types";
import { QueryKeys } from "../../queryClient";

const transformCustomerUsers = (
  response: GetCustomerUsers.Response_Server
): GetCustomerUsers.Response => {
  const users: GetCustomerUsers.Response["users"] = response.users.map(
    (serverUser) => ({
      id: serverUser.id,
      firstName: serverUser.first_name,
      lastName: serverUser.last_name,
      email: serverUser.email,
      phoneNumber: serverUser.phone_number,
      role: serverUser.role,
      vehicleIds: serverUser.vehicle_ids,
    })
  );

  return { users };
};

export const useGetCustomerUsers = (
  params: GetCustomerUsers.Params,
  options: UseQueryOptions<
    GetCustomerUsers.Response_Server,
    unknown,
    GetCustomerUsers.Response
  > = {}
) => {
  const { customerId } = params;

  return useQuery<
    GetCustomerUsers.Response_Server,
    unknown,
    GetCustomerUsers.Response
  >(
    [QueryKeys.CUSTOMER_USERS, customerId],
    async () => await getCustomerUsers(customerId),
    {
      ...options,
      select: transformCustomerUsers,
    }
  );
};

export const useCreateUser = (
  options: UseMutationOptions<GetUser.Response, unknown, CreateUserPayload> = {}
): UseMutationResult<GetUser.Response, unknown, CreateUserPayload> => {
  return useMutation<GetUser.Response, unknown, CreateUserPayload>({
    ...options,
    mutationFn: createUser,
    mutationKey: [QueryKeys.USER_DATA],
  });
};
