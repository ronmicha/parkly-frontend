import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowModel,
  GridRowModes,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { TableToolbar, type ToolbarButtonProps } from "./TableToolbar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuid } from "uuid";
import { useUserManagementData } from "./hooks";
import { type TableRow } from "./types";
import { useState } from "react";

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

const createEmptyRow = (): TableRow => {
  const id = uuid();

  return {
    id,
    fname: "",
    lname: "",
    phone: "",
    email: "",
    admin: false,
    vehicles: "",
    isNew: true,
  };
};

export const UserManagement = () => {
  const {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    createUser,
    updateUser,
    customerId,
    isLoading,
  } = useUserManagementData();

  const handleAddUserClick = (): void => {
    const emptyUser = createEmptyRow();

    setRows((oldRows) => [...oldRows!, emptyUser]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [emptyUser.id]: { mode: GridRowModes.Edit, fieldToFocus: "fname" },
    }));
  };

  const addUserButtonProps: ToolbarButtonProps = {
    label: "Add user",
    onClick: handleAddUserClick,
    startIcon: <AddIcon />,
  };

  const deleteUsersButtonProps: ToolbarButtonProps = {
    label: "Delete users",
    onClick: () => null, // ToDo
    startIcon: <DeleteIcon />,
  };

  const [toolbarButtons, setToolbarButtons] = useState<ToolbarButtonProps[]>([
    addUserButtonProps,
  ]);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }

        setRowModesModel((oldModel) => ({
      ...oldModel,
      [params.id]: { mode: GridRowModes.View },
    }));
  };

  const processRowUpdate = (newRow: GridRowModel<TableRow>) => {
    const userData = {
      firstName: newRow.fname,
      lastName: newRow.lname,
      phoneNumber: newRow.phone,
      email: newRow.email,
      role: newRow.admin ? ("admin" as const) : null,
      customerId: customerId!,
      vehicleIds: newRow.vehicles ? newRow.vehicles.split(", ") : null,
    };

    if (newRow.isNew) {
      createUser(userData);
    } else {
      updateUser({ id: newRow.id, ...userData });
    }

    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) =>
      prevRows!.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowSelectionModelChange = (
    selectedRowIds: GridRowSelectionModel
  ) => {
    if (selectedRowIds.length === 0) {
      setToolbarButtons([addUserButtonProps]);
    } else {
      setToolbarButtons([addUserButtonProps, deleteUsersButtonProps]);
    }
  };

  return (
    <>
      <h1 style={{ margin: "0", padding: "21px" }}>User Management</h1>
      <DataGrid
        style={{ height: "calc(100% - 91px)" }}
        rows={rows ?? []}
        columns={columns}
        editMode={"row"}
        rowModesModel={rowModesModel}
        onRowModesModelChange={setRowModesModel}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleRowSelectionModelChange}
        loading={isLoading}
        slots={{ toolbar: TableToolbar }}
        slotProps={{ toolbar: { buttons: toolbarButtons } }}
      />
    </>
  );
};
