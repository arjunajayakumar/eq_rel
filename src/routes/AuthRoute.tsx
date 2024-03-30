import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";

import { useDispatch } from "react-redux";
import authSlice from "@/modules/Authentication/store/slice/auth.slice";
import { ReactJSXElement } from "../interface/interface";

export function AuthRoute({ children }: ReactJSXElement) {
  const [checkAuthStatus, setCheckAuthStatus] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setCheckAuthStatus(true);
          dispatch(authSlice.actions.setIsAuthenticated(true));
        } else {
          setCheckAuthStatus(true);
        }
      });
    })();
  }, [checkAuthStatus]);
  return checkAuthStatus && children;
}
