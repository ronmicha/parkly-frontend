import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowModel,
  type GridRowModesModel,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { useGetCustomerUsers, useGetProfile } from "../../api/domains";

const columns: GridColDef[] = [
  { field: "fname", headerName: "First name", editable: true, flex: 1 },
  { field: "lname", headerName: "Last name", editable: true, flex: 1 },
  { field: "phone", headerName: "Phone number", editable: true, flex: 1 },
  { field: "email", headerName: "Email", editable: true, flex: 1 },
  {
    field: "admin",
    headerName: "Is admin?",
    editable: true,
    flex: 1,
    type: "boolean",
  },
  { field: "vehicles", headerName: "Vehicle IDs", editable: true, flex: 1 },
];

export const UserManagement = () => {
  const [rows, setRows] = useState<GridRowsProp | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data: getProfileResponse } = useGetProfile();

  const { data } = useGetCustomerUsers(
    { customerId: getProfileResponse?.userData.customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
  );

  useEffect(() => {
    if (data?.users) {
      const rows: GridRowsProp = data.users.map((user) => ({
        id: user.id,
        fname: user.firstName,
        lname: user.lastName,
        phone: user.phoneNumber,
        email: user.email,
        admin: user.role === "admin",
        vehicles: user.vehicleIds.join(", "),
      }));

      setRows(rows);
    }
  }, [data?.users]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    console.count("processRowUpdate");
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) =>
      prevRows!.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  return (
    <>
      <h1>User Management</h1>
      <DataGrid
        rows={rows ?? []}
        columns={columns}
        editMode={"row"}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        disableRowSelectionOnClick
        loading={rows === null}
      />
    </>
  );
};
