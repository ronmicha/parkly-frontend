import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import {
  createParkingSlot,
  createUser,
  deleteParkingSlots,
  deleteUsers,
  getCustomerUsers,
  updateParkingSlot,
  updateUser,
} from "./api";
import {
  type CreateParkingSlot,
  type CreateUser,
  type DeleteParkingSlots,
  type DeleteUsers,
  type GetCustomerUsers,
  type UpdateParkingSlot,
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

// region users

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

export const useDeleteUsers = (
  options: UseMutationOptions<
    DeleteUsers.Response,
    unknown,
    DeleteUsers.Payload
  > = {}
): UseMutationResult<DeleteUsers.Response, unknown, DeleteUsers.Payload> => {
  return useMutation<DeleteUsers.Response, unknown, DeleteUsers.Payload>({
    ...options,
    mutationFn: deleteUsers,
  });
};

// endregion

// region parking slots

export const useCreateParkingSlot = (
  options: UseMutationOptions<
    CreateParkingSlot.Response,
    unknown,
    CreateParkingSlot.Payload
  > = {}
): UseMutationResult<
  CreateParkingSlot.Response,
  unknown,
  CreateParkingSlot.Payload
> => {
  return useMutation<
    CreateParkingSlot.Response,
    unknown,
    CreateParkingSlot.Payload
  >({
    ...options,
    mutationFn: createParkingSlot,
  });
};

export const useUpdateParkingSlot = (
  options: UseMutationOptions<
    UpdateParkingSlot.Response,
    unknown,
    UpdateParkingSlot.Payload
  > = {}
): UseMutationResult<
  UpdateParkingSlot.Response,
  unknown,
  UpdateParkingSlot.Payload
> => {
  return useMutation<
    UpdateParkingSlot.Response,
    unknown,
    UpdateParkingSlot.Payload
  >({
    ...options,
    mutationFn: updateParkingSlot,
  });
};

export const useDeleteParkingSlot = (
  options: UseMutationOptions<
    DeleteParkingSlots.Response,
    unknown,
    DeleteParkingSlots.Payload
  > = {}
): UseMutationResult<
  DeleteParkingSlots.Response,
  unknown,
  DeleteParkingSlots.Payload
> => {
  return useMutation<
    DeleteParkingSlots.Response,
    unknown,
    DeleteParkingSlots.Payload
  >({
    ...options,
    mutationFn: deleteParkingSlots,
  });
};

// endregion
