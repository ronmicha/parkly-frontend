import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";
import { QueryKeys } from "../common";
import { getParkingSlots, updateSlotStatus } from "./api";
import { type GetParkingSlots, type UpdateSlotStatusPayload } from "./types";

const transformGetParkingSlotsResponse = (
  response: GetParkingSlots.Response_Server
): GetParkingSlots.Response => {
  return {
    parkingSlots: response.parkingSlots.map((ps) => ({
      id: ps.id,
      slotNumber: Number(ps.slot_number),
      slotFloor: Number(ps.slot_floor),
      slotType: ps.slot_type,
      vehicleId: ps.vehicle_id,
    })),
  };
};

export const useGetParkingSlots = (
  params: GetParkingSlots.Params,
  options: UseQueryOptions = {}
): UseQueryResult<GetParkingSlots.Response> => {
  const { parkingAreaId } = params;

  return useQuery<unknown, unknown, GetParkingSlots.Response>(
    [QueryKeys.PARKING_SLOTS, parkingAreaId],
    async () => await getParkingSlots(parkingAreaId),
    { ...options, select: transformGetParkingSlotsResponse }
  );
};

export const useUpdateSlotStatus = (
  options?: UseMutationOptions<unknown, unknown, UpdateSlotStatusPayload>
): UseMutationResult<unknown, unknown, UpdateSlotStatusPayload> => {
  const queryClient = useQueryClient();

  return useMutation(updateSlotStatus, {
    ...options,
    onSuccess: (data, variables) => {
      const cache = queryClient.getQueryCache();
      const parkingSlotsKey = cache.findAll(["parking_slots"])[0].queryKey;
      queryClient.setQueryData(parkingSlotsKey, (prevData) => {
        const updatedData: GetParkingSlots.Response_Server = JSON.parse(
          JSON.stringify(prevData)
        );
        const updatedSlot = updatedData.parkingSlots.find(
          (slot) => slot.id === variables.slotId
        );
        updatedSlot!.vehicle_id = variables.vehicleId;
        return updatedData;
      });
    },
  });
};
