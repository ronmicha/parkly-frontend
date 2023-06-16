import { createElement } from "react";
import { type ListItemProps } from "../../design-system/components";
import { type ParkingSlot } from "../../api";
import { ListRow } from "./ListRow";
import { sortBy } from "../../packages/utils";

type ListData = ListItemProps[];

const convertListToSlotsByFloor = (
  slots: ParkingSlot[]
): Record<number, ParkingSlot[]> => {
  return slots.reduce(
    (obj: Record<number, ParkingSlot[]>, slot: ParkingSlot) => {
      const { slotFloor } = slot;

      if (!obj[slotFloor]) {
        obj[slotFloor] = [];
      }

      obj[slotFloor].push(slot);
      return obj;
    },
    {}
  );
};

const convertObjToListData = (
  obj: Record<number, ParkingSlot[]>,
  onRowClick: (slotId: string, existingVehicleId: string | null) => void
): ListData => {
  return Object.entries(obj).reduce((data: ListData, [floor, slots]) => {
    const item: ListItemProps = {
      text: `Floor ${floor}`,
      items: slots.map((slot) => ({
        text: createElement(ListRow, { slot }),
        onClick: () => {
          onRowClick(slot.id, slot.vehicleId);
        },
      })),
    };

    return [...data, item];
  }, []);
};

export const convertSlotsToListData = (
  parkingSlots: ParkingSlot[],
  onRowClick: (slotId: string, existingVehicleId: string | null) => void
): ListData => {
  const sortedSlots = sortBy(parkingSlots, "slotFloor", "desc");
  const slotsByFloor = convertListToSlotsByFloor(sortedSlots);
  return convertObjToListData(slotsByFloor, onRowClick);
};
