import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/domains";
import { LoginForm, type LoginFormData } from "../../components";
import { Paths } from "../../navigation";
import { browserStorage } from "../../packages/browserStorage";

export const LoginPage = () => {
  const navigate = useNavigate();

  const onLoginSuccess = (): void => {
    navigate(Paths.WELCOME);
  };

  const { mutate: login } = useLogin({
    onSuccess: () => {
      browserStorage.isLoggedIn.set("true");
      onLoginSuccess();
    },
  });

  useEffect(() => {
    const isLoggedIn = browserStorage.isLoggedIn.get();
    if (isLoggedIn) {
      onLoginSuccess();
    }
  }, []);

  const handleLogin = ({ phoneNumber, password }: LoginFormData): void => {
    login({ phoneNumber, password });
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};
