import authSlice from "../slice/auth.slice";

import { call, put, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { GetUserRolesService } from "../../service/auth.service";

import { PHONE_NMLS_ERROR } from "@/lib/errorCodes";
import { SAVE_CREDENTIALS } from "@/src/routes/routesConstants";

import { AuthMeResponseTypes } from "../../interface/auth.interface";

function* AuthMeSaga(action: PayloadAction<boolean>) {
  try {
    const response: AuthMeResponseTypes = yield call(GetUserRolesService);
    if (response) {
      yield put(authSlice.actions.setAuthMe(response));
      if (action.payload) {
        localStorage.setItem("userRole", response?.roles?.name);
      } else {
        sessionStorage.setItem("userRole", response?.roles?.name);
      }
    }
  } catch (err) {
    const error = (err as AxiosError).message;
    if (error.toLocaleLowerCase().trim() === PHONE_NMLS_ERROR) {
      window.location.pathname = SAVE_CREDENTIALS;
      toast.error(error, { theme: "colored" });
    }
  }
}

export default function* authSaga() {
  yield takeEvery(authSlice.actions.getAuthMe.type, AuthMeSaga);
}
