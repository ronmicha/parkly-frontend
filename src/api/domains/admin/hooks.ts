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
import { transformUserData } from "../utils";

const transformCustomerUsers = (
  response: GetCustomerUsers.Response_Server
): GetCustomerUsers.Response => {
  return {
    users: response.users.map(transformUserData),
  };
};

export const useGetCustomerUsers = (
  options: UseQueryOptions<
    GetCustomerUsers.Response_Server,
    unknown,
    GetCustomerUsers.Response
  > = {}
) => {
  return useQuery<
    GetCustomerUsers.Response_Server,
    unknown,
    GetCustomerUsers.Response
  >([QueryKeys.CUSTOMER_USERS], getCustomerUsers, {
    ...options,
    select: transformCustomerUsers,
  });
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
