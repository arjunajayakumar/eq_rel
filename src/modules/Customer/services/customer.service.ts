import axiosInstance from "@/lib/interceptors";
import {
  AddCustomerDetails,
  CustomerListTypes,
  CustomerListParams,
  StateListTypes,
  CustomerDetailsTypes,
} from "../interface/customer.interface";
import { BASE_URL } from "@/lib/config";
import { ENDPOINTS } from "@/lib/constants";
import { AxiosError } from "axios";

export const StateListService = async (): Promise<StateListTypes[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${ENDPOINTS.STATE}`, {
      params: { sort: "DESC", limit: 50, page: 0 },
    });
    return response?.data?.data as StateListTypes[];
  } catch (err) {
    return [] as StateListTypes[];
  }
};

export const AddNewCustomer = async (body: AddCustomerDetails) => {
  try {
    await axiosInstance.post(`${BASE_URL}/${ENDPOINTS.CUSTOMER}`, body);
    const response = "addNewCustomer";
    return response;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};

export const ListCustomer = async ({ search, order, page, sort }: CustomerListParams): Promise<CustomerListTypes> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${ENDPOINTS.CUSTOMER}`, {
      params: { search, page, order, sort },
    });
    return response?.data?.data as CustomerListTypes;
  } catch (err) {
    return {} as CustomerListTypes;
  }
};

export const CustomerDetailsService = async (id: string): Promise<CustomerDetailsTypes> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${ENDPOINTS.CUSTOMER}/${id}`);
    return response?.data?.data as CustomerDetailsTypes;
  } catch (err) {
    return {} as CustomerDetailsTypes;
  }
};

export const RemoveCustomerService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/${ENDPOINTS.CUSTOMER}/${id}`);
    return response;
  } catch (err) {}
};

export const EditCustomerService = async (body: AddCustomerDetails, id: string) => {
  try {
    await axiosInstance.patch(`${BASE_URL}/${ENDPOINTS.CUSTOMER}/${id}`, body);
    const response = "editCustomer";
    return response;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};
