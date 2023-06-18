import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addResponseMiddleware } from "../api/service";
import { Paths } from "./paths";

export const UnAuthRedirect = (): JSX.Element => {
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
