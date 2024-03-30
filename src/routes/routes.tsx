import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AuthLayout from "@/components/Layout/AuthLayout/AuthLayout";
import MainLayout from "@/components/Layout/MainLayout/MainLayout";
import CustomerList from "modules/Customer/pages/CustomerList/CustomerList";
import {
  CUSTOMERS,
  CUSTOMER_DETAILS,
  LOGIN,
  ORGANIZATION_REGISTRATION,
  REPORTS,
  SAVE_CREDENTIALS,
  USERS,
  VALIDATE_USER,
} from "./routesConstants";
import CustomerDetails from "@/modules/Customer/pages/CustomerDetails/CustomerDetails";
import Reports from "@/modules/Reports/pages/Reports";
import UserList from "../modules/Users/pages/Users/UserList";
import ValidateUser from "@/modules/Authentication/pages/OrganizationRegistration/ValidateUser";
import OrganizationRegistration from "@/modules/Authentication/pages/OrganizationRegistration/OrganizationRegistration";
import OrganizationLastStepModel from "@/modules/Authentication/pages/OrganizationRegistration/OrganizationLastStepModel";

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route
        path={LOGIN}
        element={
          <PublicRoute>
            <AuthLayout>
              <Home />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path={ORGANIZATION_REGISTRATION}
        element={
          <PublicRoute>
            <AuthLayout>
              <OrganizationRegistration />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path={SAVE_CREDENTIALS}
        element={
          <PublicRoute>
            <AuthLayout>
              <OrganizationLastStepModel />
            </AuthLayout>
          </PublicRoute>
        }
      />
      <Route
        path={CUSTOMERS}
        element={
          <PrivateRoute>
            <MainLayout>
              <CustomerList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={`${CUSTOMER_DETAILS}/:id`}
        element={
          <PrivateRoute>
            <MainLayout>
              <CustomerDetails />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={REPORTS}
        element={
          <PrivateRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={USERS}
        element={
          <PrivateRoute>
            <MainLayout>
              <UserList />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={VALIDATE_USER}
        element={
          <PublicRoute>
            <AuthLayout>
              <ValidateUser />
            </AuthLayout>
          </PublicRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
