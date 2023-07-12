import { v4 as uuid } from "uuid";
import { type CreateUser, type GetCustomerUsers } from "../../../api/domains";
import {
  GenericAdminTable,
  type GenericCol,
  type GenericRow,
} from "../GenericAdminTable";
import { type TableRow, useUserManagementData } from "./useUserManagementData";

const columns: GenericCol[] = [
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

const convertDataToRow = (user: GetCustomerUsers.CustomerUser): TableRow => ({
  id: user.id,
  fname: user.firstName,
  lname: user.lastName,
  phone: user.phoneNumber,
  email: user.email,
  admin: user.role === "admin",
  vehicles: user.vehicleIds?.join(", "),
});

export const UserManagement = () => {
  const { users, customerId, createUser, updateUser, deleteUsers, isLoading } =
    useUserManagementData();

  const processRowUpdate = (newRow: GenericRow<TableRow>) => {
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

    return { ...newRow, isNew: false };
  };

  const handleDelete = (userIds: string[]): void => {
    deleteUsers({ userIds });
  };

  return (
    <>
      <h1 style={{ margin: "0", padding: "21px" }}>User Management</h1>
      <GenericAdminTable
        data={users}
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
