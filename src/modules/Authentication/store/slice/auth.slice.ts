import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InitialState } from "@/store/types/auth.type";
import type { LoginBody } from "@/types/auth";
import { AuthMeResponseTypes } from "../../interface/auth.interface";
import { AUTH_ME_DATA, VALIDATE_USER_DETAILS } from "@/lib/constants";

const initialState: InitialState = {
  isAuthenticated: false,
  rememberMe: false,
  authMeData: AUTH_ME_DATA,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const login = (state: InitialState, _action: PayloadAction<LoginBody>) => state;

const setIsAuthenticated = (state: InitialState, action: PayloadAction<InitialState["isAuthenticated"]>) => ({
  ...state,
  isAuthenticated: action.payload,
});

// Slice functions to trigger AuthMeSaga and set it's response in the state autMeData
const getAuthMe = (state: InitialState, action: PayloadAction<boolean>) => ({
  ...state,
  rememberMe: action.payload,
});
const setAuthMe = (state: InitialState, action: PayloadAction<AuthMeResponseTypes>) => ({
  ...state,
  authMeData: action.payload,
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login,
    setIsAuthenticated,
    getAuthMe,
    setAuthMe,
  },
});

export default authSlice;
