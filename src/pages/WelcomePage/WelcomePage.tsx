import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../api/domains";
import { Paths } from "../../navigation";

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { data: getProfileResponse, isLoading } = useGetProfile();

  if (isLoading) {
    return null;
  }

  const { userData } = getProfileResponse!;

  const navigateAsUser = (): void => {
    navigate(Paths.PARKING_LIST);
  };

  const navigateAsAdmin = (): void => {
    navigate(Paths.ADMIN);
  };

  if (userData.role === "admin") {
    return (
      <>
        <h1>Hello, {userData.firstName}</h1>
        <button onClick={navigateAsUser}>User</button>
        <button onClick={navigateAsAdmin}>Admin</button>
      </>
    );
  }

  navigateAsUser();

  return <></>;
};
