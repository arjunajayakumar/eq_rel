import Button from "@/components/Button";
import NoData from "@/components/NoData/NoData";
import SearchInput from "@/components/Search";
import TableRowHeader from "@/components/Table";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import Data from "../../../../assets/data.json";
import ArrowIcon from "../../../../assets/images/svg/arrow_icon.svg";
import NoDataIcon from "../../../../assets/images/svg/noCustomer_icon.svg";
import MenuVerticalIcon from "../../../../assets/images/svg/menu-vertical_icon.svg";
import DropDownIcon from "../../../../assets/images/svg/down-grey_icon.svg";

import Modal from "react-modal";
import ResendInvite from "./ResendInvite";
import RemoveUser from "./RemoveUser";
import AddUser from "../AddUser/AddUser";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(Data);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Active");
  const dropdownRef: any = useRef(null);
  const pageRef = useRef() as MutableRefObject<HTMLInputElement>;

  const itemsPerPage = 10;
  const totalItems = searchResults.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const [showToolTips, setShowToolTips] = useState(Array(currentItems?.length).fill(false));
  const toolTipRefs: any = useRef(Array(currentItems?.length).map(() => React.createRef()));

  const toggleToolTip = (index: number) => {
    setShowToolTips((prevToolTips) => {
      const newToolTips = [...prevToolTips];
      newToolTips[index] = !newToolTips[index];
      return newToolTips;
    });
  };

  useEffect(() => {
    // Add event listener to document when the dropdown is shown
    if (showDropDown) {
      document.addEventListener("click", handleClickOutside);
    }
    if (showToolTips) {
      document.addEventListener("click", handleClickOutside);
    }
    // Clean up the event listener when the component unmounts or the dropdown is hidden
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropDown, showToolTips]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleClickOutside = (event: { target: any }) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
    if (toolTipRefs.current && !toolTipRefs.current?.current?.contains(event.target)) {
      setShowToolTips(Array(currentItems?.length).fill(false));
    }
  };

  const handleOptionSelect = (value: any) => {
    setSelectedValue(value);
    setShowDropDown(false);
  };

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleGoToPage = () => {
    let pageNumber = parseInt(pageRef.current.value);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = (value: any) => {
    setSearchQuery(value);
    const results = Data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setSearchResults(results);
    setCurrentPage(1);
  };

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalResndIsOpen, setResendIsOpen] = useState<boolean>(false);
  const removeUserModel = () => {
    setIsOpen(true);
    setShowToolTips(Array(currentItems?.length).fill(false));
  };
  const closeModal = () => {
    setIsOpen(false);
    setResendIsOpen(false);
  };
  const resendInviteModel = () => {
    setResendIsOpen(true);
    setShowToolTips(Array(currentItems?.length).fill(false));
  };

  return (
    <div className="flex flex-col h-screen font-Inter">
      <div className="p-4 flex justify-between items-center">
        <div className="w-[460px]">
          <SearchInput
            name="search"
            placeholder="Search users by name or email address"
            value={searchQuery}
            onSearch={handleSearch}
          />
        </div>
        <div
          className={`relative flex bg-mainBackground text-xs font-medium border border-mainBackground text-greyBlackLightColor rounded h-[33px] w-[139px] w-min-[200px] items-center px-4 justify-between
        ${showDropDown ? "border-greyBlackLightColor" : ""}
        `}
          ref={dropdownRef}
        >
          <span className="">Status: </span>

          <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropDown}>
            <span className="pl-2">{selectedValue}</span>

            <img className="pl-3" src={DropDownIcon} alt="" />
          </div>
          {showDropDown && (
            <div className="absolute shadow-card rounded-md top-9 left-0 bg-white w-full z-10">
              <div className="flex flex-col text-xs font-medium text-greyBlackColor text-right ">
                <span
                  className={` px-4 py-2 cursor-pointer ${selectedValue === "All" ? "text-blackLightColor font-semibold" : ""}`}
                  onClick={() => handleOptionSelect("All")}
                >
                  All
                </span>
                <span
                  className={` px-4 py-2 cursor-pointer ${
                    selectedValue === "Active" ? "text-blackLightColor font-semibold" : ""
                  }`}
                  onClick={() => handleOptionSelect("Active")}
                >
                  Active
                </span>
                <span
                  className={` px-4 py-2 cursor-pointer ${
                    selectedValue === "Invited" ? "text-blackLightColor font-semibold" : ""
                  }`}
                  onClick={() => handleOptionSelect("Invited")}
                >
                  Invited
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex w-full items-center bg-interLightBlack px-4 h-8 border-l border-r border-white">
          {currentItems.length > 1 && (
            <div className="flex w-full">
              <div className="w-2/5">
                <TableRowHeader title={"User"} sort={true} />
              </div>
              <div className="w-1/5">
                <TableRowHeader title={"Email"} sort={false} />
              </div>
              <div className="w-1/5">
                <TableRowHeader title={"Status"} sort={false} />
              </div>

              <div className="w-1/5 flex justify-center">
                <TableRowHeader title={"Last Activicty"} sort={true} />
              </div>
              <div className="w-5 flex justify-center">
                <TableRowHeader title={""} sort={false} />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col table-layout overflow-y-auto border-l border-r border-white">
          {currentItems.length < 1 && (
            <div className="flex flex-col h-full  items-center">
              <img className="mt-20 w-[163px] h-[71px]" src={NoDataIcon} alt="" />
              <h2 className="text-interBlack text-xl font-medium py-2">No users are listed yet</h2>

              <span className="text-greyBlackColor text-sm font-medium text-center">
                Click “Add User” to add the details
                <br /> of users
              </span>
            </div>
          )}

          {/* if Search result 0  */}
          {/* <NoData /> */}

          {currentItems.map((item, index) => (
            <div
              key={index}
              className="flex border-b border-sideNavButtonBg w-full items-center justify-between h-14 min-h-[56px] px-4 hover:bg-sideNavButtonBg"
            >
              <div className="flex items-center w-2/5">
                <div
                  className="h-33 w-33 rounded-md flex items-center justify-center font-semibold"
                  style={{ backgroundColor: item?.bgColor }}
                >
                  <span className="uppercase text-xs" style={{ color: item?.textColor }}>
                    {item?.name
                      .split(" ")
                      .map((namePart) => namePart.charAt(0))
                      .join("")}
                  </span>
                </div>
                <span className="text-sm font-semibold text-interBlack capitalize pl-2 truncate w-[90%]">{item?.name}</span>
              </div>
              <div className="w-1/5 flex items-center ">
                <span className="text-sm font-medium text-greyWhiteColor lowercase">{item?.email}</span>
              </div>
              <div className="w-1/5 flex items-center ">
                <div
                  className={` font-medium rounded px-4 ${
                    item?.status === "Invited" ? " bg-[#34405433] text-interBlack" : "bg-[#CEF3E2] text-[#007B22]"
                  } `}
                >
                  <span className="text-sm capitalize">{item?.status}</span>
                </div>
              </div>

              <div className="w-1/5 flex items-center justify-center">
                <span className="text-sm font-medium text-greyBlackColor ">{item?.lastUpdate}</span>
              </div>
              <div className="w-5 flex justify-center relative" ref={toolTipRefs.current[index]}>
                <img src={MenuVerticalIcon} alt="" className="cursor-pointer" onClick={() => toggleToolTip(index)} />
                {showToolTips[index] && (
                  <div className="absolute shadow-card rounded -left-24 top-8 z-10 bg-white w-28">
                    <div className="flex flex-col text-sm font-normal ">
                      <span className="h-9 cursor-pointer flex items-center justify-center text-blackLightColor">
                        Resend Invite
                      </span>
                      <span
                        className="h-9 cursor-pointer flex items-center justify-center text-redErrorColor"
                        onClick={() => removeUserModel()}
                      >
                        Remove User
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {currentItems.length > 1 && (
          <div className="flex justify-between items-center border-t border-sideNavButtonBg h-14 px-4">
            <div className="flex items-center">
              <span className="text-xs font-medium text-greyBlackLightColor">
                Page {currentPage} of {Math.ceil(searchResults.length / itemsPerPage)} (Items {indexOfFirstItem + 1} to{" "}
                {Math.min(indexOfLastItem, searchResults.length)} of {searchResults.length})
              </span>
              <span className="text-xs font-medium text-greyBlackLightColor pl-3">Go to page</span>
              <input
                type="number"
                autoFocus
                id="pageInput"
                className="border border-buttonLightGreen rounded-md text-xs px-2 h-7 mx-2 w-9 focus:outline-none"
              />
              <div className="flex items-center cursor-pointer" onClick={handleGoToPage}>
                <span className="text-xs font-medium text-interBlack mr-1">Go</span>
                <img src={ArrowIcon} className="w-1" alt="" />
              </div>
            </div>
            <div className="flex items-center">
              <Button
                text={"Previous"}
                className={`text-greyBlackColor text-xs font-medium rounded h-8 w-20 mr-4 ${
                  currentPage === 1 ? "opacity-80 cursor-not-allowed bg-sideNavButtonBg " : "opacity-100 bg-mainBackground"
                } `}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              <Button
                text={"Next"}
                className={`bg-mainBackground text-greyBlackColor text-xs font-medium rounded h-8 w-20 ${
                  indexOfLastItem >= searchResults.length ? "opacity-80 cursor-not-allowed" : "opacity-100"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastItem >= searchResults.length}
              />
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="mx-auto  rounded shadow-modal"
        style={{
          overlay: {
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.61)",
          },
        }}
      >
        <RemoveUser />
      </Modal>
      <Modal
        isOpen={modalResndIsOpen}
        onRequestClose={closeModal}
        className="mx-auto  rounded shadow-modal"
        style={{
          overlay: {
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.61)",
          },
        }}
      >
        {/* <ResendInvite /> */}

        <AddUser />
      </Modal>
    </div>
  );
};

export default UserList;
