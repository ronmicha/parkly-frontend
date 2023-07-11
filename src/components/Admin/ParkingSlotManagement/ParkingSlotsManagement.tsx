import { useEffect } from "react";
import {
  type GridColDef,
  type GridRowModel,
  GridRowModes,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { v4 as uuid } from "uuid";
import { AdminTable, useAdminTableData } from "../GenericAdminTable";
import { type TableRow, useParkingSlotsData } from "./useParkingSlotsData";

const columns: GridColDef[] = [
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

export const ParkingSlotManagement = () => {
  const { parkingSlots, createSlot, updateSlot, deleteSlots, isLoading } =
    useParkingSlotsData();

  const { rows, setRows, rowModesModel, setRowModesModel } =
    useAdminTableData<TableRow>();

  useEffect(() => {
    if (parkingSlots) {
      const rows: GridRowsProp<TableRow> = parkingSlots.map((slot) => ({
        id: slot.id,
        number: slot.slotNumber.toString(),
        floor: slot.slotFloor.toString(),
        type: slot.slotType,
      }));

      setRows(rows);
    }
  }, [parkingSlots]);

  const handleRowEdit = (newRow: GridRowModel<TableRow>) => {
    const slotData = {};

    if (newRow.isNew) {
      createSlot(slotData);
    } else {
      updateSlot({ id: newRow.id, ...slotData });
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) =>
      prevRows!.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleAddClick = (): void => {
    const emptyParkingSlot = createEmptyRow();

    setRows((prevRows) => [...prevRows!, emptyParkingSlot]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [emptyParkingSlot.id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: "number",
      },
    }));
  };

  const handleDeleteClick = (slotIds: string[]): void => {
    deleteSlots({ slotIds });
    setRows((prevRows) => prevRows!.filter((row) => !slotIds.includes(row.id)));
  };

  return (
    <>
      <h1 style={{ margin: "0", padding: "21px" }}>Parking Slot Management</h1>
      <AdminTable
        rows={rows}
        columns={columns}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        processRowUpdate={handleRowEdit}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isLoading}
        onAddClick={handleAddClick}
        onDeleteClick={handleDeleteClick}
      />
    </>
  );
};
