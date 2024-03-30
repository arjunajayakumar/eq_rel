import { BASE_URL } from "@/lib/config";
import { ENDPOINTS } from "@/lib/constants";
import axiosInstance from "@/lib/interceptors";
import { AxiosError } from "axios";
import { OrganizationUserBody, UserRoles } from "../interface/users.interface";

export const UserCreateOrganizationUserService = async (body: OrganizationUserBody) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/${ENDPOINTS.ORGANIZATION}/${ENDPOINTS.USER}`, body);
    return response;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};

export const GetOrganizationUserRolesService = async (): Promise<UserRoles[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${ENDPOINTS.ROLES}`);
    return response?.data?.data as UserRoles[];
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};
