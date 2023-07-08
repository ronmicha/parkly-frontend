import { useEffect, useState } from "react";
import { type GridRowModesModel, type GridRowsProp } from "@mui/x-data-grid";
import {
  useCreateUser,
  useGetCustomerUsers,
  useGetProfile,
  useUpdateUser,
} from "../../../api/domains";
import { type TableRow } from "./types";

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

  return {
    rows,
    setRows,
    rowModesModel,
    setRowModesModel,
    createUser,
    updateUser,
    customerId,
    isLoading: getProfileLoading || getCustomerUsersLoading,
  };
};
