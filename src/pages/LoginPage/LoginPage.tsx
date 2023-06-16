import { SignUpForm, type SignUpFormData } from "../../components";
import { useCreateUser } from "../../api";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../navigation";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate: createUser } = useCreateUser({
    onSuccess: () => {
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
