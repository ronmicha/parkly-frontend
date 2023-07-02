import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addResponseMiddleware } from "../../api/service";
import { Paths } from "../../navigation";

export const UnAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    addResponseMiddleware((response) => {
      if (response.status === 401) {
        navigate(Paths.LOGIN);
      }
    });
  }, [navigate]);

  return <></>;
};
