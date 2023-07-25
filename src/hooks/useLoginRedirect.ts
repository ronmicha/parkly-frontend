import { useEffect } from "react";
import { Paths, useRouter } from "../navigation";
import { addResponseMiddleware } from "../api/service";
import { browserStorage } from "../packages/browserStorage";

export const useLoginRedirect = () => {
  const { navigate } = useRouter();

  useEffect(() => {
    addResponseMiddleware({
      onError: (error) => {
        if (error.response?.status === 401) {
          browserStorage.isLoggedIn.remove();
          navigate(Paths.LOGIN);
        } else if (error.code === "ERR_NETWORK") {
          navigate(Paths.LOGIN);
        }
      },
    });
  }, [navigate]);
};
