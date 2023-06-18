import { ApiEndpoints, apiService, type ApiResponse } from "../../service";
import { type GetParkingSlots, type UpdateSlotStatusPayload } from "./types";

export const getParkingSlots = async (
  parkingAreaId: string
): Promise<GetParkingSlots.Response_Server> => {
  const params: GetParkingSlots.Params = {
    parkingAreaId,
  };
  const response: ApiResponse<GetParkingSlots.Response_Server> =
    await apiService.get(ApiEndpoints.PARKING_SLOTS, { params });

  return response.data;
};

export const updateSlotStatus = async (
  payload: UpdateSlotStatusPayload
): Promise<void> => {
  await apiService.post(ApiEndpoints.UPDATE_SLOT_STATUS, payload);
};
