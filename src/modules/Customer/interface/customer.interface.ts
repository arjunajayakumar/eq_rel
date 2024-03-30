export interface AddCustomerDetails {
  first_name: string;
  last_name: string;
  dob: string;
  country_code: string;
  phone_number: string;
  state_id: string;
  // organization_id: number;
}

export interface StateListTypes {
  id: string;
  name: string;
}

export interface AddCustomerInitialValues {
  first_name: string;
  last_name: string;
  phone_number: string;
  dob: Date | null;
  state: string;
}

export interface CustomerListParams {
  page: number;
  search: string;
  order: string;
  sort: string;
}

export interface CustomerDetailsTypes {
  id: string;
  first_name: string;
  last_name: string;
  country_code: string;
  phone_number: string;
  updatedAt?: Date;
  createdAt?: Date;
  last_report_created_date?: Date;
  dob: Date;
  states: {
    id: string;
    name: string;
  };
}
export interface CustomerListTypes {
  count: number;
  rows: CustomerDetailsTypes[];
}

export interface EditObjectType {
  first_name: string;
  last_name: string;
  phone_number: string;
  dob: Date | null;
  states: {
    name: string;
    id: string;
  };
}
