import { Dispatch, Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnyAction } from "redux";
import { useAppDispatch } from "@/hooks/useRedux";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";
import { TopNavData } from "@/modules/Settings/interface/settings.interface";
import { auth } from "@/lib/firebase";
import Modal from "react-modal";
import authSlice from "@/modules/Authentication/store/slice/auth.slice";

import ProfileDetailsModel from "./ProfileDetailsModal/ProfileDetailsModal";

import { CUSTOMERS, LOGIN, routesArray, REPORTS, USERS } from "routes/routesConstants";
import { CUSTOMERS_DATA, REPORT_DATA, USERS_DATA, USER_ROLES, AUTH_ME_DATA } from "@/lib/constants";

import UsersIcon from "@/src/assets/imagesComponents/UserIcon";
import CustomersIcon from "@/src/assets/imagesComponents/CustomersIcon";
import ReportsIcon from "@/src/assets/imagesComponents/ReportsIcon";

import EquityReleaseLogo from "../../equity_release_logo.svg";
import ArrowIcon from "../../assets/images/svg/arrow_icon.svg";
import LogoutIcon from "../../assets/images/svg/logout_icon.svg";

const SideNav = (): JSX.Element => {
  const pageUrl: string = window.location.pathname;
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const userRole: string | null = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // Handle logout functionality whilst also clearing AuthMeData state
  const handleLogout = async (): Promise<void> => {
    await auth.signOut();
    dispatch(authSlice.actions.setAuthMe(AUTH_ME_DATA));
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = LOGIN;
  };

  // To handle header texts and button texts on page load
  const handleNavigationOnRender = (): void => {
    routesArray.forEach((item) => {
      if (pageUrl.includes(item)) handleNavigation(item);
    });
  };

  useEffect((): void => {
    handleNavigationOnRender();
  }, []);

  // To handle header texts and button texts on page load by clicking side nav buttons
  const handleNavigation = (page: string): void => {
    switch (page) {
      case CUSTOMERS:
        dispatch(
          settingSlice.actions.setTopNavData({
            heading: CUSTOMERS_DATA.heading,
            buttonText: CUSTOMERS_DATA.buttonText,
          } as TopNavData)
        );
        break;

      case REPORTS:
        dispatch(
          settingSlice.actions.setTopNavData({
            heading: REPORT_DATA.heading,
            buttonText: REPORT_DATA.buttonText,
          } as TopNavData)
        );
        break;

      case USERS:
        dispatch(
          settingSlice.actions.setTopNavData({
            heading: USERS_DATA.heading,
            buttonText: USERS_DATA.buttonText,
          } as TopNavData)
        );
        break;

      default:
        break;
    }
  };

  // return strings to display side nav icons based on different user roles
  const handleSideNavIcons = (userRole: string | null): string => {
    if (userRole) {
      switch (userRole) {
        case USER_ROLES.ORGANIZATION_USER:
          return "user";
        case USER_ROLES.ORGANIZATION_ADMIN:
          return "admin";
        case USER_ROLES.LOAN_OFFICER:
          return "admin";

        default:
          break;
      }
    }
    return "";
  };

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Fragment>
      <div className="flex justify-between flex-col py-10 w-full h-screen bg-white border border-r-greyLightColor">
        <div>
          <div className="flex mx-9 mb-12 items-center">
            <div className="">
              <img className="w-9 h-9" src={EquityReleaseLogo} alt="*" />
            </div>
            <div>
              <a href="#" className="flex items-center py-4 px-4">
                <span className="font-medium font-Inter text-base text-interBlack">Equity Release</span>
              </a>
            </div>
          </div>

          {handleSideNavIcons(userRole) === "user" && (
            <NavLink to={REPORTS} onClick={() => handleNavigation(REPORTS)}>
              <div className="flex mx-5 mt-2 mb-1 items-center  hover:bg-sideNavButtonBg rounded h-42 menuItems">
                <div className="ml-4">
                  <ReportsIcon />
                </div>
                <div>
                  <a href="#" className="flex items-center py-3 px-4">
                    <span className="font-semibold font-Inter text-sm text-interBlack">Reports</span>
                  </a>
                </div>
              </div>
            </NavLink>
          )}

          {handleSideNavIcons(userRole) === "user" && (
            <NavLink to={CUSTOMERS} onClick={() => handleNavigation(CUSTOMERS)}>
              <div className="flex mx-5 mt-2 mb-1 items-center  hover:bg-sideNavButtonBg rounded h-42 menuItems">
                <div className="ml-4">
                  <CustomersIcon />
                </div>
                <div>
                  <a href="#" className="flex items-center py-3 px-4">
                    <span className="font-semibold font-Inter text-sm text-interBlack">Customers</span>
                  </a>
                </div>
              </div>
            </NavLink>
          )}

          {handleSideNavIcons(userRole) === "admin" && (
            <NavLink to={USERS} onClick={() => handleNavigation(USERS)}>
              <div className="flex mx-5 mt-2 mb-1 items-center  hover:bg-sideNavButtonBg rounded h-42 menuItems">
                <div className="ml-4">
                  <UsersIcon />
                </div>
                <div>
                  <a href="#" className="flex items-center py-3 px-4">
                    <span className="font-semibold font-Inter text-sm text-interBlack">Users</span>
                  </a>
                </div>
              </div>
            </NavLink>
          )}
        </div>
        <div className="mx-5 ">
          <div className="border border-sideNavButtonBg w-full mb-5 rounded flex flex-col">
            <div className="bg-mainBackground flex items-center justify-between h-16 px-4">
              <div className="flex  items-center justify-center">
                <div className="h-8 w-8 rounded-full  text-base flex items-center justify-center font-semibold bg-[#7696DE]">
                  <span className="text-white uppercase">JD</span>
                </div>
                <div className="flex flex-col pl-3">
                  <span className="text-sm font-semibold text-interBlack">John Doe</span>
                  <span className="text-sm font-medium text-greyBlackLightColor"> Loan Officer</span>
                </div>
              </div>
              <div>
                <img onClick={openModal} src={ArrowIcon} alt="" className="cursor-pointer" />
              </div>
            </div>

            <div className="flex items-center justify-start px-5 h-11 cursor-pointer" onClick={handleLogout}>
              <div className="">
                <img src={LogoutIcon} alt="*" />
              </div>
              <p className="font-Inter text-sm text-greyBlackLightColor font-semibold pl-2">Logout</p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="mx-auto rounded-lg shadow-modal"
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
        <ProfileDetailsModel />
      </Modal>
    </Fragment>
  );
};

export default SideNav;
