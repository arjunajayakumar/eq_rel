import type { VoidGenerator } from "@/types/index";
import { call, put, takeEvery } from "redux-saga/effects";
import type { PutEffect, CallEffect } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginBody } from "@/types/auth";
import loaderSlice from "../../../../store/slices/loader.slice";

function* settingsSaga(action: PayloadAction<LoginBody>): VoidGenerator<PutEffect | CallEffect, Promise<boolean>> {
  try {
    yield put(loaderSlice.actions.startLoadingAction(""));
  } catch (e) {
  } finally {
    yield put(loaderSlice.actions.stopLoadingAction(""));
  }
}

export default function* settingSaga() {
  yield takeEvery("settingsSaga", settingsSaga);
}
