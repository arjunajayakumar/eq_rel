import { Fragment } from "react";
import Header from "@/components/Header/Header";
import { ReactJSXElement } from "interface/interface";

const AuthLayout = ({ children }: ReactJSXElement) => {
  return (
    <Fragment>
      <div className="flex flex-col h-screen overflow-hidden bg-mainBackground">
        <Header />
        {children}
      </div>
    </Fragment>
  );
};

export default AuthLayout;
