import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { createUser, getCustomerUsers, updateUser } from "./api";
import {
  type CreateUser,
  type GetCustomerUsers,
  type UpdateUser,
} from "./types";
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
      customerId: serverUser.customer_id,
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
  options: UseMutationOptions<
    CreateUser.Response,
    unknown,
    CreateUser.Payload
  > = {}
): UseMutationResult<CreateUser.Response, unknown, CreateUser.Payload> => {
  return useMutation<CreateUser.Response, unknown, CreateUser.Payload>({
    ...options,
    mutationFn: createUser,
  });
};

export const useUpdateUser = (
  options: UseMutationOptions<
    UpdateUser.Response,
    unknown,
    UpdateUser.Payload
  > = {}
): UseMutationResult<UpdateUser.Response, unknown, UpdateUser.Payload> => {
  return useMutation<UpdateUser.Response, unknown, UpdateUser.Payload>({
    ...options,
    mutationFn: updateUser,
  });
};
