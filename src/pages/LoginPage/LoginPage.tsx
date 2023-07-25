import { useEffect } from "react";
import { Box } from "../../design-system/components";
import { useLogin } from "../../api/domains";
import { LoginForm, type LoginFormData } from "../../components";
import { Paths, useRouter } from "../../navigation";
import { browserStorage } from "../../packages/browserStorage";

export const LoginPage = () => {
  const { navigate } = useRouter();

  const onLoginSuccess = (): void => {
    navigate(Paths.WELCOME);
  };

  const { mutate: login, isError } = useLogin({
    onSuccess: () => {
      browserStorage.isLoggedIn.set("true");
      onLoginSuccess();
    },
  });

  useEffect(() => {
    const isLoggedIn = browserStorage.isLoggedIn.get();
    if (isLoggedIn) {
      // onLoginSuccess();
    }
  }, []);

  const handleLogin = ({ phoneNumber, password }: LoginFormData): void => {
    login({ phoneNumber, password });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: 1,
        width: 1,
      }}
    >
      <LoginForm onSubmit={handleLogin} loginError={isError} />
    </Box>
  );
};
