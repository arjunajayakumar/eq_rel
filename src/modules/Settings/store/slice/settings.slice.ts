import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TopNavData, ModalState } from "../../interface/settings.interface";
import { EditObjectType } from "@/modules/Customer/interface/customer.interface";

interface InitialState {
  topNavData: TopNavData;
  modals: ModalState;
  invokeCustomersList: boolean;
  customerId: string;
  editData: EditObjectType;
  invokeCustomerDetails: boolean;
  customerName: {
    firstName: string;
    lastName: string;
  };
}

const editData: EditObjectType = {
  first_name: "",
  last_name: "",
  phone_number: "",
  dob: null,
  states: {
    id: "",
    name: "",
  },
};

const initialState: InitialState = {
  topNavData: {
    buttonText: "",
    heading: "",
  },
  modals: {
    addCustomer: false,
    addUser: false,
  },
  invokeCustomersList: false,
  customerId: "",
  editData,
  invokeCustomerDetails: false,
  customerName: {
    firstName: "",
    lastName: "",
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setTopNavData = (state: InitialState, action: PayloadAction<TopNavData>) => ({
  ...state,
  topNavData: action.payload,
});

const setAddCustomerModalState = (state: InitialState, action: PayloadAction<boolean>) => ({
  ...state,
  modals: { ...state.modals, addCustomer: action.payload },
});

const setAddUserModalState = (state: InitialState, action: PayloadAction<boolean>) => ({
  ...state,
  modals: { ...state.modals, addUser: action.payload },
});

const invokeCustomersList = (state: InitialState, action: PayloadAction<boolean>) => ({
  ...state,
  invokeCustomersList: action.payload,
});

const setEditCustomer = (state: InitialState, action: PayloadAction<string>) => ({
  ...state,
  customerId: action.payload,
});

const setEditDataObject = (state: InitialState, action: PayloadAction<EditObjectType>) => ({
  ...state,
  editData: action.payload,
});

const invokeCustomerDetails = (state: InitialState, action: PayloadAction<boolean>) => ({
  ...state,
  invokeCustomerDetails: action.payload,
});

const setCustomerName = (state: InitialState, action: PayloadAction<{ firstName: string; lastName: string }>) => ({
  ...state,
  customerName: action.payload,
});

const settingSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTopNavData,
    setAddCustomerModalState,
    setAddUserModalState,
    invokeCustomersList,
    setEditCustomer,
    setEditDataObject,
    invokeCustomerDetails,
    setCustomerName,
  },
});

export default settingSlice;
