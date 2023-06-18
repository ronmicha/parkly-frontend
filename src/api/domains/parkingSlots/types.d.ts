enum SlotType {
  Single = "single",
  Blocked = "blocked",
  Blocking = "blocking",
}

type ParkingSlot = Pick<GetParkingSlots.ParkingSlot_Server, "id"> & {
  slotNumber: number;
  slotFloor: number;
  slotType: SlotType;
  vehicleId: string | null;
};

export declare namespace GetParkingSlots {
  type Params = {
    parkingAreaId: string;
  };

  type ParkingSlot_Server = {
    id: string;
    slot_number: number;
    slot_floor: number;
    slot_type: SlotType;
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
