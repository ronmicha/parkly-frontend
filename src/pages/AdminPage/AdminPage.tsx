import { useGetCustomerUsers, useGetProfile } from "../../api/domains";

export const AdminPage = () => {
  const { data: getProfileResponse, isLoading } = useGetProfile();
  const { data } = useGetCustomerUsers(
    { customerId: getProfileResponse?.userData.customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
  );

  if (isLoading) {
    return null;
  }

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
        {(data?.users ?? []).map((user) => (
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
