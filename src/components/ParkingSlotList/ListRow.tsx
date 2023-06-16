import { type ParkingSlot } from "../../api";

type SlotProps = {
  slot: ParkingSlot;
};

export const ListRow = ({ slot }: SlotProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      {slot.slotNumber} {slot.slotType}{" "}
      {slot.vehicleId ? `Taken by ${slot.vehicleId}` : "Free"}
    </div>
  );
};
