import { ReactJSXElement } from "interface/interface";
import { Fragment } from "react";
import SideNav from "@/components/SideNav/SideNav";
import TopNav from "@/components/TopNav/TopNav";

const MainLayout = ({ children }: ReactJSXElement) => {
  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/3 lg:w-1/5">
          <SideNav />
        </div>
        <div className="w-2/3 lg:w-4/5">
          <div className="flex flex-col h-full w-full px-12 pb-7 pt-8 bg-mainBackground rounded-lg">
            <TopNav />
            <div className="rounded-lg shadow-pageShadow bg-white w-full h-full mt-5 routerLayout">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MainLayout;
