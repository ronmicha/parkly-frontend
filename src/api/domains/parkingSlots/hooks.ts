import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../../queryClient";
import { transformParkingSlot } from "../utils";
import { getParkingSlots, updateSlotStatus } from "./api";
import { type GetParkingSlots, type UpdateSlotStatusPayload } from "./types";

export const useGetParkingSlots = (
  params: GetParkingSlots.Params,
  options: UseQueryOptions<
    GetParkingSlots.Response_Server,
    unknown,
    GetParkingSlots.Response
  > = {}
): UseQueryResult<GetParkingSlots.Response> => {
  const { parkingAreaId } = params;

  return useQuery<
    GetParkingSlots.Response_Server,
    unknown,
    GetParkingSlots.Response
  >(
    [QueryKeys.PARKING_SLOTS, parkingAreaId],
    async () => await getParkingSlots(parkingAreaId),
    {
      ...options,
      select: (response) => ({
        parkingSlots: response.parkingSlots.map(transformParkingSlot),
      }),
    }
  );
};

export const useUpdateSlotStatus = (
  options: UseMutationOptions<unknown, unknown, UpdateSlotStatusPayload> = {}
): UseMutationResult<unknown, unknown, UpdateSlotStatusPayload> => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown, UpdateSlotStatusPayload>({
    mutationFn: updateSlotStatus,
    ...options,
    onSuccess: (data, variables, context) => {
      const cache = queryClient.getQueryCache();
      const { queryKey } = cache.findAll([QueryKeys.PARKING_SLOTS])[0];
      queryClient.setQueryData(queryKey, (prevData) => {
        const updatedData: GetParkingSlots.Response_Server = JSON.parse(
          JSON.stringify(prevData)
        );
        const updatedSlot = updatedData.parkingSlots.find(
          (slot) => slot.id === variables.slotId
        );
        updatedSlot!.vehicle_id = variables.vehicleId;
        return updatedData;
      });
      options.onSuccess?.(data, variables, context);
    },
  });
};
