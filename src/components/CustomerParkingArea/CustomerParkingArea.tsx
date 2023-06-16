import { type ParkingSlot, useGetParkingSlots } from "../../api";
import { useMemo } from "react";
import { ParkingSlotList } from "../ParkingSlotList";

type CustomerParkingAreaProps = {
  parkingAreaId: string;
  name: string;
  streetAddress: string;
  city: string;
};

const getTotalFreeSlots = (slots: ParkingSlot[]): number => {
  return slots.reduce((totalFreeSlots, current) => {
    const count = current.vehicleId ? 0 : 1;
    return totalFreeSlots + count;
  }, 0);
};

export const CustomerParkingArea = ({
  parkingAreaId,
  name,
  streetAddress,
  city,
}: CustomerParkingAreaProps) => {
  const { data: parkingSlotsResponse } = useGetParkingSlots({ parkingAreaId });
  const { parkingSlots = [] } = parkingSlotsResponse || {};

  const totalFreeSlots = useMemo(
    () => getTotalFreeSlots(parkingSlots),
    [parkingSlots]
  );

  return (
    <>
      <div>
        {name} / {streetAddress} / {city}
      </div>
      <div>Total free slots: {totalFreeSlots}</div>
      <ParkingSlotList parkingSlots={parkingSlots} />
    </>
  );
};
