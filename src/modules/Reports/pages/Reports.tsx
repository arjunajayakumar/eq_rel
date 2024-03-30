import SearchInput from "@/components/Search";
import { useState } from "react";
import Modal from "react-modal";

import NoDataIcon from "../../../assets/images/svg/noCustomer_icon.svg";

const Reports = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="flex flex-col h-screen font-Inter">
      <div className="p-4 w-[460px]">
        <SearchInput name="search" placeholder="Search Reports " autoFocus />
      </div>
      <div className="flex flex-col">
        <div className="flex w-full items-center bg-interLightBlack px-4 h-8"></div>

        <div className="flex flex-col table-layout overflow-y-auto">
          <div className="flex flex-col h-full  items-center">
            <img className="mt-20 w-[163px] h-[71px]" src={NoDataIcon} alt="" />
            <h2 className="text-interBlack text-xl font-medium py-2">No Reports yet</h2>

            <span className="text-greyBlackColor text-sm font-medium text-center">
              Click “New Report” to generate loan reports <br /> for customers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
