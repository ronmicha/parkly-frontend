import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../../queryClient";
import { getProfile, login } from "./api";
import { transformUserData } from "../utils";
import { type GetUser, type Login } from "./types";

export const useLogin = (
  options: UseMutationOptions<Login.Response, unknown, Login.Payload>
): UseMutationResult<Login.Response, unknown, Login.Payload> => {
  return useMutation<Login.Response, unknown, Login.Payload>({
    ...options,
    mutationFn: login,
    mutationKey: [QueryKeys.USER_DATA],
  });
};

export const useGetProfile = (
  options: UseQueryOptions<
    GetUser.Response_Server,
    unknown,
    GetUser.Response
  > = {}
): UseQueryResult<GetUser.Response> => {
  const queryKey = [QueryKeys.USER_DATA];

  return useQuery<GetUser.Response_Server, unknown, GetUser.Response>(
    queryKey,
    getProfile,
    {
      ...options,
      select: (response) => ({
        userData: transformUserData(response.userData),
      }),
    }
  );
};
