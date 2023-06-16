import { type ParkingSlot, useGetUser, useUpdateSlotStatus } from "../../api";
import { List } from "../../design-system/components";
import { convertSlotsToListData } from "./utils";
import { useCallback, useMemo } from "react";

type ParkingSlotListProps = {
  parkingSlots: ParkingSlot[];
};

export const ParkingSlotList = ({ parkingSlots }: ParkingSlotListProps) => {
  const { data: getUserResponse } = useGetUser({});
  const { mutate: updateSlotStatus } = useUpdateSlotStatus({});

  const handleSlotClick = useCallback(
    (slotId: string, existingVehicleId: string | null): void => {
      const vehicleId = existingVehicleId
        ? null
        : getUserResponse!.userData.vehicleId;
      updateSlotStatus({ slotId, vehicleId });
    },
    []
  );

  const listData = useMemo(
    () => convertSlotsToListData(parkingSlots, handleSlotClick),
    [parkingSlots, handleSlotClick]
  );

  return <List data={listData} />;
};
