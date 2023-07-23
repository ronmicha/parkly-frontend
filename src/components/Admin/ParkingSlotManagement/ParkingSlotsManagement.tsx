import { v4 as uuid } from "uuid";
import {
  GenericAdminTable,
  type GenericCol,
  type GenericRow,
} from "../GenericAdminTable";
import { type TableRow, useParkingSlotsData } from "./useParkingSlotsData";
import {
  type CreateParkingSlot,
  type ParkingSlot,
  SlotType,
} from "../../../api/domains";

const columns: GenericCol[] = [
  { field: "number", headerName: "Number", editable: true, flex: 1 },
  { field: "floor", headerName: "Floor", editable: true, flex: 1 },
  {
    field: "type",
    headerName: "Type",
    editable: true,
    flex: 1,
    type: "singleSelect",
    valueOptions: ["single", "double"],
  },
];

const createEmptyRow = (): TableRow => {
  return {
    id: uuid(),
    number: NaN,
    floor: NaN,
    type: "",
    isNew: true,
  };
};

const convertDataToRow = (slot: ParkingSlot): TableRow => ({
  id: slot.id,
  number: slot.slotNumber,
  floor: slot.slotFloor,
  type: slot.slotType === SlotType.Single ? "single" : "double",
});

const calculateDoubleSlotType = (
  slotNumber: ParkingSlot["slotNumber"],
  allSlots: ParkingSlot[]
): SlotType => {
  for (const slot of allSlots) {
    if (slot.slotNumber === slotNumber - 1) {
      return SlotType.Blocked;
    }
  }
  return SlotType.Blocking;
};

export const ParkingSlotManagement = () => {
  const {
    parkingSlots,
    createSlot,
    updateSlot,
    deleteSlots,
    parkingAreaId,
    isLoading,
  } = useParkingSlotsData();

  const processRowUpdate = (newRow: GenericRow<TableRow>) => {
    const slotData: CreateParkingSlot.Payload = {
      slotNumber: newRow.number,
      slotFloor: newRow.floor,
      parkingAreaId: parkingAreaId!,
      slotType:
        newRow.type === "single"
          ? SlotType.Single
          : calculateDoubleSlotType(newRow.number, parkingSlots!),
    };

    if (newRow.isNew) {
      createSlot(slotData);
    } else {
      updateSlot({ id: newRow.id, ...slotData });
    }

    return { ...newRow, isNew: false };
  };

  const handleDelete = (slotIds: string[]): void => {
    deleteSlots({ slotIds });
  };

  return (
    <GenericAdminTable
      title={"Parking Slot Management"}
      data={parkingSlots}
      columns={columns}
      convertDataToRow={convertDataToRow}
      createEmptyRow={createEmptyRow}
      processRowUpdate={processRowUpdate}
      onDelete={handleDelete}
      loading={isLoading}
    />
  );
};
