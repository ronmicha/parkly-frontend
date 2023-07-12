import { v4 as uuid } from "uuid";
import {
  GenericAdminTable,
  type GenericCol,
  type GenericRow,
} from "../GenericAdminTable";
import { type TableRow, useParkingSlotsData } from "./useParkingSlotsData";
import { type CreateParkingSlot, type ParkingSlot } from "../../../api/domains";

const columns: GenericCol[] = [
  { field: "number", headerName: "Number", editable: true, flex: 1 },
  { field: "floor", headerName: "Floor", editable: true, flex: 1 },
  { field: "type", headerName: "Type", editable: true, flex: 1 },
];

const createEmptyRow = (): TableRow => {
  return {
    id: uuid(),
    number: "",
    floor: "",
    type: "",
    isNew: true,
  };
};

const convertDataToRow = (slot: ParkingSlot): TableRow => ({
  id: slot.id,
  number: `${slot.slotNumber}`,
  floor: `${slot.slotFloor}`,
  type: slot.slotType,
});

export const ParkingSlotManagement = () => {
  const { parkingSlots, createSlot, updateSlot, deleteSlots, isLoading } =
    useParkingSlotsData();

  const processRowUpdate = (newRow: GenericRow<TableRow>) => {
    const slotData: CreateParkingSlot.Payload = {
      slotNumber: parseInt(newRow.number),
      slotFloor: parseInt(newRow.floor),
      slotType: newRow.type,
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
    <>
      <h1 style={{ margin: "0", padding: "21px" }}>Parking Slot Management</h1>
      <GenericAdminTable
        data={parkingSlots}
        columns={columns}
        convertDataToRow={convertDataToRow}
        createEmptyRow={createEmptyRow}
        processRowUpdate={processRowUpdate}
        onDelete={handleDelete}
        loading={isLoading}
      />
    </>
  );
};
