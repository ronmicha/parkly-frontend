import { SignUpForm, type SignUpFormData } from "../../components";
import { useCreateUser } from "../../api";

export const LoginPage = () => {
  const { mutate: createUser } = useCreateUser();

  const handleSignUp = (
    data: SignUpFormData,
    activeVehicleId: string
  ): void => {
    createUser({
      ...data,
      activeVehicleId,
    });
  };

  return (
    <>
      <SignUpForm onSubmit={handleSignUp} />
    </>
  );
};
