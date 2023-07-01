import {
  type ParkingSlot,
  useGetProfile,
  useUpdateSlotStatus,
} from "../../api/domains";
import { List } from "../../design-system/components";
import { convertSlotsToListData } from "./utils";
import { useCallback, useMemo } from "react";

type ParkingSlotListProps = {
  parkingSlots: ParkingSlot[];
};

export const ParkingSlotList = ({ parkingSlots }: ParkingSlotListProps) => {
  const { data: getProfileResponse } = useGetProfile();
  const { mutate: updateSlotStatus } = useUpdateSlotStatus({});

  const handleSlotClick = useCallback(
    (slotId: string, existingVehicleId: string | null): void => {
      const vehicleId = existingVehicleId
        ? null
        : getProfileResponse!.userData.activeVehicleId;
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
