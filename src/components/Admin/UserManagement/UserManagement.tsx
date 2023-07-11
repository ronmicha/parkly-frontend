import { useEffect } from "react";
import {
  type GridColDef,
  type GridRowModel,
  GridRowModes,
  type GridRowsProp,
} from "@mui/x-data-grid";
import { v4 as uuid } from "uuid";
import { type CreateUser } from "../../../api/domains";
import { AdminTable, useAdminTableData } from "../GenericAdminTable";
import { type TableRow, useUserManagementData } from "./useUserManagementData";

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
  return {
    id: uuid(),
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
  const { users, customerId, createUser, updateUser, deleteUsers, isLoading } =
    useUserManagementData();

  const { rows, setRows, rowModesModel, setRowModesModel } =
    useAdminTableData<TableRow>();

  useEffect(() => {
    if (users) {
      const rows: GridRowsProp<TableRow> = users.map((user) => ({
        id: user.id,
        fname: user.firstName,
        lname: user.lastName,
        phone: user.phoneNumber,
        email: user.email,
        admin: user.role === "admin",
        vehicles: user.vehicleIds?.join(", "),
      }));

      setRows(rows);
    }
  }, [users]);

  const handleRowEdit = (newRow: GridRowModel<TableRow>) => {
    const userData: CreateUser.Payload = {
      firstName: newRow.fname,
      lastName: newRow.lname,
      phoneNumber: newRow.phone,
      email: newRow.email,
      role: newRow.admin ? "admin" : null,
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

  const handleAddClick = (): void => {
    const emptyUser = createEmptyRow();

    setRows((prevRows) => [...prevRows!, emptyUser]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [emptyUser.id]: { mode: GridRowModes.Edit, fieldToFocus: "fname" },
    }));
  };

  const handleDeleteClick = (userIds: string[]): void => {
    deleteUsers({ userIds });
    setRows((prevRows) => prevRows!.filter((row) => !userIds.includes(row.id)));
  };

  return (
    <>
      <h1 style={{ margin: "0", padding: "21px" }}>User Management</h1>
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
