import { type Camelize } from "../types";
import { type ParkingArea } from "../parkingAreas";

enum SlotType {
  Single = "single",
  Blocked = "blocked",
  Blocking = "blocking",
}

type ParkingSlot = Camelize<GetParkingSlots.ParkingSlot_Server>;

export declare namespace GetParkingSlots {
  type Params = {
    parkingAreaId: string;
  };

  type ParkingSlot_Server = {
    id: string;
    slot_number: number;
    slot_floor: number;
    slot_type: SlotType;
    parking_area_id: ParkingArea["id"];
    vehicle_id: string | null;
  };

  type Response_Server = {
    parkingSlots: ParkingSlot_Server[];
  };

  type Response = {
    parkingSlots: ParkingSlot[];
  };
}

export type UpdateSlotStatusPayload = {
  slotId: string;
  vehicleId: string | null;
};
