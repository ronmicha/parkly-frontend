import { useGetCustomerUsers, useGetProfile } from "../../api/domains";
import { DataGrid, type GridColDef, type GridRowsProp } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "fname", headerName: "First name", flex: 1 },
  { field: "lname", headerName: "Last name", flex: 1 },
  { field: "phone", headerName: "Phone number", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "admin", headerName: "Is admin?", flex: 1 },
  { field: "vehicles", headerName: "Vehicle IDs", flex: 1 },
];

export const UserManagement = () => {
  const { data: getProfileResponse } = useGetProfile();

  const { data } = useGetCustomerUsers(
    { customerId: getProfileResponse?.userData.customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
  );

  const rows: GridRowsProp = (data?.users ?? []).map((user) => ({
    id: user.id,
    fname: user.firstName,
    lname: user.lastName,
    phone: user.phoneNumber,
    email: user.email,
    admin: user.role === "admin" ? "Yes" : "No",
    vehicles: user.vehicleIds.join(", "),
  }));

  return (
    <>
      <h1>User Management</h1>
      <div>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </>
  );
};
