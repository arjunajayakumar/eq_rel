import { Navigate } from "react-router";
import { ReactJSXElement } from "interface/interface";
import { LOGIN } from "./routesConstants";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: ReactJSXElement): JSX.Element => {
  const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to={LOGIN} />;
};

export default PrivateRoute;
