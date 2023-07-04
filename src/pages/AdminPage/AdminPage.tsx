import { useGetCustomerUsers, useGetProfile } from "../../api/domains";
import { Loading } from "../../design-system/components";

const TableLoading: JSX.Element = (
  <tr style={{ position: "relative" }}>
    <div style={{ position: "absolute", left: "50%", top: "10px" }}>
      <Loading />
    </div>
  </tr>
);

export const AdminPage = () => {
  const { data: getProfileResponse, isLoading: profileLoading } =
    useGetProfile();

  const { data, isLoading: customerUsersLoading } = useGetCustomerUsers(
    { customerId: getProfileResponse?.userData.customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
  );

  const isLoading = profileLoading || customerUsersLoading;

  return (
    <div>
      <h1>User Management</h1>
      <table style={{ width: "100%" }}>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone number</th>
          <th>Email</th>
          <th>Is admin?</th>
          <th>Vehicle IDs</th>
        </tr>
        {isLoading && TableLoading}
        {data?.users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.email}</td>
            <td>{user.role === "admin" ? "Yes" : "No"}</td>
            <td>{user.vehicleIds.join(", ")}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
