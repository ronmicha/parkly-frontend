import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../api/domains";
import { LoginForm, type LoginFormData } from "../../components";
import { Paths } from "../../navigation";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate: createUser } = useCreateUser({
    onSuccess: () => {
      navigate(Paths.PARKING_LIST);
    },
  });

  const handleLogin = (data: LoginFormData): void => {
    debugger;
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};
