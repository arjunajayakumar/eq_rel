import { combineReducers } from "redux";
import authSlice from "../modules/Authentication/store/slice/auth.slice";
import loaderSlice from "./slices/loader.slice";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  loader: loaderSlice.reducer,
  settings: settingSlice.reducer,
});

export default rootReducer;
