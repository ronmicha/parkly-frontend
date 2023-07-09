import { useEffect, useState } from "react";
import {
  type GridRowModel,
  GridRowModes,
  type GridRowModesModel,
  type GridRowsProp,
} from "@mui/x-data-grid";
import {
  type CreateUser,
  useCreateUser,
  useDeleteUsers,
  useGetCustomerUsers,
  useGetProfile,
  useUpdateUser,
} from "../../../api/domains";
import { type TableRow } from "./types";
import { v4 as uuid } from "uuid";

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

export const useUserManagementData = () => {
  const [rows, setRows] = useState<GridRowsProp<TableRow>>();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data: getProfileResponse, isLoading: getProfileLoading } =
    useGetProfile();

  const customerId = getProfileResponse?.userData.customerId;

  const { data, isLoading: getCustomerUsersLoading } = useGetCustomerUsers(
    { customerId: customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
  );

  const { mutate: createUser } = useCreateUser();

  const { mutate: updateUser } = useUpdateUser();

  const { mutate: deleteUsers } = useDeleteUsers();

  useEffect(() => {
    if (data?.users) {
      const rows: GridRowsProp<TableRow> = data.users.map((user) => ({
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
  }, [data?.users]);

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

  const handleAddUserClick = (): void => {
    const emptyUser = createEmptyRow();

    setRows((prevRows) => [...prevRows!, emptyUser]);
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [emptyUser.id]: { mode: GridRowModes.Edit, fieldToFocus: "fname" },
    }));
  };

  const handleDeleteUsersClick = (userIds: string[]): void => {
    deleteUsers({ userIds });
    setRows((prevRows) => prevRows!.filter((row) => !userIds.includes(row.id)));
  };

  return {
    rows,
    rowModesModel,
    setRowModesModel,
    isLoading: getProfileLoading || getCustomerUsersLoading,
    handleRowEdit,
    handleAddUserClick,
    handleDeleteUsersClick,
  };
};
