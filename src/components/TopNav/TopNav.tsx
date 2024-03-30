import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { Dispatch, useEffect, useState } from "react";
import { AnyAction } from "redux";
import { RootState } from "@/store/index";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";
import { NavigateFunction, useNavigate } from "react-router";

import Modal from "react-modal";
import AddCustomer from "@/modules/Customer/pages/AddCustomer";
import { ModalState, TopNavData } from "@/modules/Settings/interface/settings.interface";

import NewProposalsIcon from "../../assets/images/svg/new_proposal_icon.svg";
import RightArrowIcon from "../../assets/images/svg/right_arrow.svg";
import { DETAILS, USER_ROLES } from "@/lib/constants";
import { capitalizeFirstLetter } from "@/lib/helper";
import { CUSTOMERS } from "@/src/routes/routesConstants";
import AddUser from "@/modules/Users/pages/AddUser/AddUser";

const TopNav = (): JSX.Element => {
  const pagePath: string = window.location.pathname;
  const userRole: string | null = localStorage.getItem("userRole") || sessionStorage.getItem("userRole");
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const TopNavData = useAppSelector((state: RootState): TopNavData => state.settings.topNavData);
  const ModalState = useAppSelector((state: RootState): ModalState => state.settings.modals);
  const customerName = useAppSelector((state: RootState) => state.settings.customerName);

  const [isNotVisible, setIsNotVisible] = useState<boolean>(false);

  const handleModal = (buttonText: string): void => {
    switch (buttonText.toLocaleLowerCase().trim()) {
      case "add customer":
        dispatch(settingSlice.actions.setAddCustomerModalState(true));
        break;
      case "add user":
        dispatch(settingSlice.actions.setAddUserModalState(true));
        break;

      default:
        break;
    }
  };

  useEffect((): void => {
    if (!pagePath.includes(DETAILS.toLocaleLowerCase().trim())) {
      dispatch(settingSlice.actions.setCustomerName({ firstName: "", lastName: "" }));
      setIsNotVisible(false);
    } else {
      setIsNotVisible(true);
    }
  }, [pagePath]);

  const handleButtonComponent = (role: string) => {
    switch (role) {
      case USER_ROLES.ORGANIZATION_USER:
        return <AddCustomer />;

      case USER_ROLES.ORGANIZATION_ADMIN:
        return <AddUser />;

      case USER_ROLES.LOAN_OFFICER:
        return <AddUser />;

      default:
        break;
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        {!customerName?.firstName ? (
          <h2 className="font-semibold text-3xl font-Inter ">{TopNavData.heading}</h2>
        ) : (
          <div className="flex items-center">
            <h6
              className="font-medium text-sm font-Inter text-gray-500 mr-3 cursor-pointer"
              onClick={() => {
                navigate(CUSTOMERS);
              }}
            >
              {TopNavData.heading}
            </h6>
            <div className="w-5">
              <img src={RightArrowIcon} alt="*" />
            </div>
            <h6 className="font-medium text-sm font-Inter" style={{ marginLeft: "0.5em" }}>{`${capitalizeFirstLetter(
              customerName?.firstName
            )} ${capitalizeFirstLetter(customerName?.lastName)}`}</h6>
          </div>
        )}
      </div>

      {!isNotVisible && (
        <button
          className="flex border border-buttonColorGreen text-buttonColorGreen items-center h-12 px-6 rounded bg-white"
          onClick={() => handleModal(TopNavData.buttonText)}
        >
          <div className="mr-4">
            <img src={NewProposalsIcon} alt="*" className="w-7" />
          </div>
          <p className=" font-Inter font-semibold text-base">{TopNavData.buttonText}</p>
        </button>
      )}

      <Modal
        isOpen={ModalState.addCustomer || ModalState.addUser}
        ariaHideApp={false}
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
        {handleButtonComponent(userRole as string)}
      </Modal>
    </div>
  );
};

export default TopNav;
