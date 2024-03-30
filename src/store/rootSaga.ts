import { all } from "redux-saga/effects";
import authSaga from "../modules/Authentication/store/saga/auth.saga";
import settingSaga from "@/modules/Settings/store/saga/settings.saga";

export default function* rootSaga() {
  yield all([authSaga(), settingSaga()]);
}
