import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../../queryClient";
import { createUser, getProfile, login, transformUserData } from "./api";
import { type CreateUserPayload, type GetUser, type Login } from "./types";

export const useLogin = (
  options: UseMutationOptions<Login.Response, unknown, Login.Payload>
): UseMutationResult<Login.Response, unknown, Login.Payload> => {
  return useMutation<Login.Response, unknown, Login.Payload>({
    ...options,
    mutationFn: login,
    mutationKey: [QueryKeys.USER_DATA],
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

export const useGetProfile = (
  options: UseQueryOptions = {}
): UseQueryResult<GetUser.Response> => {
  const queryKey = [QueryKeys.USER_DATA];

  return useQuery<unknown, unknown, GetUser.Response>(queryKey, getProfile, {
    ...options,
    select: transformUserData,
  });
};
