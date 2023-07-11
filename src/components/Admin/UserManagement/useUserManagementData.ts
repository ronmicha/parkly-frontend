import {
  useCreateUser,
  useDeleteUsers,
  useGetCustomerUsers,
  useGetProfile,
  useUpdateUser,
} from "../../../api/domains";

export type TableRow = {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  admin: boolean;
  vehicles?: string;
  isNew?: boolean;
};

export const useUserManagementData = () => {
  const { data: getProfileResponse, isLoading: getProfileLoading } =
    useGetProfile();

  const customerId = getProfileResponse?.userData.customerId;

  const { data, isLoading: getCustomerUsersLoading } = useGetCustomerUsers(
    { customerId: customerId ?? "" },
    { enabled: Boolean(getProfileResponse) }
  );

  const isLoading = getProfileLoading || getCustomerUsersLoading;

  const { mutate: createUser } = useCreateUser();

  const { mutate: updateUser } = useUpdateUser();

  const { mutate: deleteUsers } = useDeleteUsers();

  return {
    users: data?.users,
    customerId,
    createUser,
    updateUser,
    deleteUsers,
    isLoading,
  };
};
