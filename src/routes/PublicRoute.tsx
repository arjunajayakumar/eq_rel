import { Navigate } from "react-router";
import { ReactJSXElement } from "interface/interface";
import { LOGIN, REPORTS, USERS } from "./routesConstants";
import { useAppSelector } from "@/hooks/useRedux";
import { RootState } from "../store";
import { USER_ROLES } from "@/lib/constants";

const PublicRoute = ({ children }: ReactJSXElement): JSX.Element => {
  const { authMeData } = useAppSelector((state: RootState) => state.auth);

  const handleRouting = (role: string): string => {
    if (role === USER_ROLES.ORGANIZATION_USER) {
      return REPORTS;
    }
    if (role === USER_ROLES.ORGANIZATION_ADMIN || role === USER_ROLES.LOAN_OFFICER) {
      return USERS;
    }
    return LOGIN;
  };

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  return isAuthenticated && authMeData?.roles?.name ? <Navigate to={handleRouting(authMeData?.roles?.name)} /> : children;
};

export default PublicRoute;
