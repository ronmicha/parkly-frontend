import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowId,
  GridRowModes,
} from "@mui/x-data-grid";
import { TableToolbar, type ToolbarButtonProps } from "./TableToolbar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserManagementData } from "./hooks";
import { useEffect, useState } from "react";

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
  const {
    rows,
    rowModesModel,
    setRowModesModel,
    isLoading,
    handleRowEdit,
    handleAddUserClick,
    handleDeleteUsersClick,
  } = useUserManagementData();

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const addUserButtonProps: ToolbarButtonProps = {
    label: "Add user",
    onClick: handleAddUserClick,
    startIcon: <AddIcon />,
  };

  const deleteUsersButtonProps: ToolbarButtonProps = {
    label: "Delete",
    onClick: () => {
      handleDeleteUsersClick(selectedRowIds);
    },
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

  const handleRowSelection = (selectedRowIds: GridRowId[]): void => {
    setSelectedRowIds(selectedRowIds as string[]);
  };

  useEffect(() => {
    if (selectedRowIds.length === 0) {
      setToolbarButtons([addUserButtonProps]);
    } else {
      setToolbarButtons([addUserButtonProps, deleteUsersButtonProps]);
    }
  }, [selectedRowIds.length]);

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
        processRowUpdate={handleRowEdit}
        rowSelectionModel={selectedRowIds}
        onRowSelectionModelChange={handleRowSelection}
        checkboxSelection
        disableRowSelectionOnClick
        loading={isLoading}
        slots={{ toolbar: TableToolbar }}
        slotProps={{ toolbar: { buttons: toolbarButtons } }}
      />
    </>
  );
};
