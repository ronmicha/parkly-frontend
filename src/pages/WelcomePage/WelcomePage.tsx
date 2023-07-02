import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../api/domains";
import { Paths } from "../../navigation";

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { data: getProfileResponse, isLoading } = useGetProfile();

  if (isLoading) {
    return null;
  }

  const { userData } = getProfileResponse;

  const handleUserClick = (): void => {
    navigate(Paths.PARKING_LIST);
  };

  const handleAdminClick = (): void => {
    navigate(Paths.ADMIN);
  };

  if (userData.role === "admin") {
    return (
      <>
        <h1>Hello, {userData.firstName}</h1>
        <button onClick={handleUserClick}>User</button>
        <button onClick={handleAdminClick}>Admin</button>
      </>
    );
  }

  handleUserClick();
};
