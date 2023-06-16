import { ApiEndpoints, apiService } from "../common";
import { type GetParkingSlots, type UpdateSlotStatusPayload } from "./types";

export const getParkingSlots = async (
  parkingAreaId: string
): Promise<GetParkingSlots.Response_Server> => {
  const params: GetParkingSlots.Params = {
    parkingAreaId,
  };
  const response = await apiService.get<GetParkingSlots.Response_Server>(
    ApiEndpoints.PARKING_SLOTS,
    { params }
  );
  return response.data;
};

export const updateSlotStatus = async (
  payload: UpdateSlotStatusPayload
): Promise<void> => {
  await apiService.post(ApiEndpoints.UPDATE_SLOT_STATUS, payload);
};
