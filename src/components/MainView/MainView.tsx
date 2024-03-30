import { Fragment } from "react";
import { ReactJSXElement } from "interface/interface";

import NewProposalsIcon from "../../assets/images/svg/new_proposal_icon.svg";

const MainView = ({ children }: ReactJSXElement): JSX.Element => {
  return (
    <Fragment>
      <div className="flex flex-col h-full w-full px-12 pb-7 pt-8 bg-mainBackground">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-3xl font-Inter">Proposals</h2>
          </div>
          <button className="flex border border-buttonColorGreen text-buttonColorGreen items-center h-12 px-6 rounded">
            <div className="mr-4">
              <img src={NewProposalsIcon} alt="*" className="w-7" />
            </div>
            <p className=" font-Inter font-semibold text-base">New Proposal</p>
          </button>
        </div>
        <div className="rounded-lg shadow-pageShadow bg-white w-full h-full mt-5 routerLayout">{children}</div>
      </div>
    </Fragment>
  );
};

export default MainView;
