import { BASE_URL } from "@/lib/config";
import { ENDPOINTS } from "@/lib/constants";
import axiosInstance from "@/lib/interceptors";
import { AxiosError } from "axios";
import { AuthMeResponseTypes, ValidateUserResponseTypes } from "../interface/auth.interface";

export const GetUserRolesService = async (): Promise<AuthMeResponseTypes> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${ENDPOINTS.AUTH}/me`);
    return response?.data?.data as AuthMeResponseTypes;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};

export const CheckValidateUserService = async (body: { verification_token: string }): Promise<ValidateUserResponseTypes> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/${ENDPOINTS.ORGANIZATION}/${ENDPOINTS.USER}/validate`, body);
    return response?.data?.data as ValidateUserResponseTypes;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};

export const CreateAccountService = async (body: { email: string; password: string; invitation_key: string }) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/${ENDPOINTS.ORGANIZATION}/${ENDPOINTS.USER}/password`, body);
    return response;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};

export const SendUserDetailsService = async (body: { nmls: string; country_code: string; phone_number: string }) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/${ENDPOINTS.ORGANIZATION}/${ENDPOINTS.USER}/details`, body);
    return response;
  } catch (err) {
    throw (err as AxiosError).response?.data;
  }
};
