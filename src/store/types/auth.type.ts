import { AuthMeResponseTypes } from "@/modules/Authentication/interface/auth.interface";

export interface InitialState {
  isAuthenticated: boolean;
  rememberMe: boolean;
  authMeData: AuthMeResponseTypes;
}
