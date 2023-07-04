import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addResponseMiddleware } from "../../api/service";
import { Paths } from "../../navigation";
import { browserStorage } from "../../packages/browserStorage";

export const UnAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    addResponseMiddleware({
      onError: (error) => {
        if (error.response?.status === 401) {
          browserStorage.isLoggedIn.remove();
          navigate(Paths.LOGIN);
        }
      },
    });
  }, [navigate]);

  return <></>;
};
