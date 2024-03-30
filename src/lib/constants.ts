import { TopNavData } from "@/modules/Settings/interface/settings.interface";
import { ENDPOINT_TYPES } from "../interface/interface";
import { AuthMeResponseTypes } from "@/modules/Authentication/interface/auth.interface";

// TopNav headings and button texts
export const CUSTOMERS_DATA: TopNavData = {
  heading: "Customers",
  buttonText: "Add Customer",
};
export const REPORT_DATA: TopNavData = {
  heading: "Reports",
  buttonText: "Add Report",
};
export const USERS_DATA: TopNavData = {
  heading: "Users",
  buttonText: "Add User",
};

// Miscellaneous
export const COUNTRY_CODE: string = "+1";
export const LIMIT: number = 10;
export const MONTH_NAMES: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const DETAILS: string = "Details";
export const LOAN_OFFICER: string = "Loan Officer";
export const AUTH_ME_DATA: AuthMeResponseTypes = {
  email: "",
  id: "",
  roles: {
    id: "",
    name: "",
  },
  user_profile: {
    country_code: "",
    first_name: "",
    last_name: "",
    nmls: "",
    phone_number: "",
  },
};

// Endpoints
export const ENDPOINTS: ENDPOINT_TYPES = {
  AUTH: "auth",
  CUSTOMER: "customer",
  STATE: "states",
  PROPOSAL: "proposal",
  ORGANIZATION: "organization",
  USER: "user",
  ROLES: "roles",
};

// User roles
export const USER_ROLES = {
  ORGANIZATION_ADMIN: "Organization Admin",
  ORGANIZATION_USER: "Organization User",
  LOAN_OFFICER: "Loan Officer",
};

export const VALIDATE_USER_DETAILS = {
  first_name: "",
  email: "",
  invitation_key: "",
  password: "",
};
