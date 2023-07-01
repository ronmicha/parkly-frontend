import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/domains";
import { LoginForm, type LoginFormData } from "../../components";
import { Paths } from "../../navigation";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate: login } = useLogin({
    onSuccess: () => {
      navigate(Paths.PARKING_LIST);
    },
  });

  const handleLogin = ({ phoneNumber, password }: LoginFormData): void => {
    login({ phoneNumber, password });
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};
