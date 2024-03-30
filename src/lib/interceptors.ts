import axios, { AxiosInstance, AxiosResponse } from "axios";
import { FirebaseError } from "firebase/app";

import { ResponseMessage } from "./api";
import { API_ENDPOINT } from "./config";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

let refresh_token: Promise<AxiosResponse<Record<string, unknown>>> | null = null;

// Authenticate into firebase
export const authenticateUser = async (email: string, password: string, rememberMe: boolean): Promise<string | FirebaseError> => {
  try {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const useCredentials = await signInWithEmailAndPassword(auth, email, password);
    return await useCredentials.user.getIdToken(true);
  } catch (err) {
    return err as FirebaseError;
  }
};

// Refresh token
export const fetchRefreshToken = (): Promise<AxiosResponse<Record<string, unknown>>> => {
  const response = axios
    .post(
      `${API_ENDPOINT}/refreshtoken`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((response) => response);
  return response as Promise<AxiosResponse<Record<string, unknown>>>;
};

// Create an instance of Axios with the desired base URL and configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await auth.currentUser?.getIdToken(true);
    const authToken = `Bearer ${token}`;
    if (config.headers) {
      config.headers["Authorization"] = authToken;
    } else {
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const config = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !Object.values<string>(ResponseMessage).includes(error?.response?.data?.message as ResponseMessage)
    ) {
      return Promise.reject(error);
    }
    if (error.response && error.response.status === 401 && !config._retry) {
      config._retry = true;
      try {
        refresh_token = refresh_token ? refresh_token : fetchRefreshToken();
        const response = await refresh_token;
        refresh_token = null;
        const responseData = (response?.data as { data: { token: string } }).data.token;
        if (responseData) {
          localStorage.setItem("accessToken", responseData);
          config.headers = {
            Authorization: `Bearer ${responseData}`,
          };
        }
        return axiosInstance(config);
      } catch (err) {
        window.localStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
