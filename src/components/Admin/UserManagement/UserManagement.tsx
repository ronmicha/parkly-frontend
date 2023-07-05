import { useEffect, useState } from "react";
import {
  DataGrid,
  type GridColDef,
  type GridEventListener,
  GridRowEditStopReasons,
  type GridRowModel,
  GridRowModes,
  type GridRowModesModel,
  type GridRowsProp,
} from "@mui/x-data-grid";
import {
  useCreateUser,
  useGetCustomerUsers,
  useGetProfile,
  useUpdateUser,
} from "../../../api/domains";
import { AddUserToolbar } from "./AddUserToolbar";
import { v4 as uuid } from "uuid";

type TableRow = {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  admin: boolean;
  vehicles?: string;
  isNew?: boolean;
};

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
      vehicleIds: newRow.vehicles?.split(", ") ?? null,
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

    setRows((oldRows) => [...oldRows!, emptyUser]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [emptyUser.id]: { mode: GridRowModes.Edit, fieldToFocus: "fname" },
    }));
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
        disableRowSelectionOnClick
        loading={getProfileLoading || getCustomerUsersLoading}
        slots={{ toolbar: AddUserToolbar }}
        slotProps={{
          toolbar: { label: "Add user", onClick: handleAddUserClick },
        }}
      />
    </>
  );
};
