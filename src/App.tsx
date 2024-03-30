import { Suspense } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes/routes";
import store from "@/store/index";
import "./App.css";
import { AuthRoute } from "./routes/AuthRoute";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div>
        <Suspense>
          <AuthRoute>
          <Router />
          </AuthRoute>
        </Suspense>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar />
    </Provider>
  );
};

export default App;
