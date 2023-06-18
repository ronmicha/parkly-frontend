import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../api/domains";
import { addHeaders } from "../../api/service";
import { SignUpForm, type SignUpFormData } from "../../components";
import { Paths } from "../../navigation";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate: createUser } = useCreateUser({
    onSuccess: (data) => {
      addHeaders({ "User-Id": data.userData.id });
      navigate(Paths.PARKING_LIST);
    },
  });

  const handleSignUp = (
    data: SignUpFormData,
    activeVehicleId: string
  ): void => {
    createUser({ ...data, activeVehicleId });
  };

  return (
    <>
      <SignUpForm onSubmit={handleSignUp} />
    </>
  );
};
