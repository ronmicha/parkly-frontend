import { useNavigate } from "react-router-dom";
import { type Paths } from "./paths";

export const useRouter = () => {
  const routerNavigate = useNavigate();

  const navigate = (path: Paths): void => {
    routerNavigate(path);
  };

  return { navigate };
};
