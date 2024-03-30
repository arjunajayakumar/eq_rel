import { Dispatch, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";
import { AnyAction } from "redux";
import { RootState } from "@/store/index";

import Modal from "react-modal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";

import SearchInput from "@/components/Search";
import TableRowHeader from "@/components/Table";
import RemoveCustomer from "./RemoveCustomer";
import AddCustomer from "../AddCustomer/AddCustomer";

import { calculateAge, capitalizeFirstLetter, formatDate, formatPhoneNumber } from "@/lib/helper";
import { CustomerDetailsService, RemoveCustomerService } from "../../services/customer.service";
import { CustomerDetailsTypes, EditObjectType } from "../../interface/customer.interface";
import { CUSTOMERS, CUSTOMER_DETAILS } from "@/src/routes/routesConstants";
import { InputTypes } from "@/src/enums/enums";

import EditIcon from "../../../../assets/images/svg/edit_icon.svg";
import DeleteIcon from "../../../../assets/images/svg/delete_icon.svg";
import ReportIcon from "../../../../assets/images/svg/report_icon.svg";
import ArrowIcon from "../../../../assets/images/svg/arrow_icon.svg";
import NoDataIcon from "../../../../assets/images/svg/noCustomer_icon.svg";

import Data from "../../../../assets/data.json";

const CustomerDetails = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState(Data);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState<{ editCustomer: boolean; removeCustomer: boolean }>({
    editCustomer: false,
    removeCustomer: false,
  });
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsTypes>({} as CustomerDetailsTypes);
  const [proposalsList, setProposalsList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<{ customerDetails: boolean; removeCustomer: boolean }>({
    customerDetails: false,
    removeCustomer: false,
  });

  const itemsPerPage = 5;
  const pageRef = useRef() as MutableRefObject<HTMLInputElement>;
  const totalItems = searchResults.length;
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const location: Location | any = useLocation();

  const modalState = useAppSelector((state: RootState) => state.settings.modals.addCustomer);
  const callCustomerDetails = useAppSelector((state: RootState) => state.settings.invokeCustomerDetails);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleGoToPage = () => {
    if (!document?.getElementById("pageInput")) {
      return;
    }
    let pageNumber = parseInt(pageRef?.current?.value);
    if (pageNumber >= 1 && pageNumber <= Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const handleCustomerDetails = async (): Promise<void> => {
    setIsLoading((prev) => ({ ...prev, customerDetails: true }));
    const response = await CustomerDetailsService(location?.state?.customerId as string);
    if (response) {
      dispatch(settingSlice.actions.setCustomerName({ firstName: response?.first_name, lastName: response?.last_name }));
      setCustomerDetails(response as CustomerDetailsTypes);
      // To change the value of invokeCustomerDetails state in redux to false so as to prevent unnecessary call of the handleCustomerDetails() function
      dispatch(settingSlice.actions.invokeCustomerDetails(false));
    }
    setIsLoading((prev) => ({ ...prev, customerDetails: false }));
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const results = Data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setSearchResults(results);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleCustomerDetails();
  }, [window.location.host.includes(CUSTOMER_DETAILS)]);

  useMemo(() => {
    if (Boolean(callCustomerDetails)) handleCustomerDetails();
  }, [callCustomerDetails]);

  const handleRemoveCustomerModal = (isOpen: boolean) => {
    setIsOpen((prev) => ({ ...prev, removeCustomer: isOpen }));
  };

  const handleRemoveCustomer = async (): Promise<void> => {
    setIsLoading((prev) => ({ ...prev, removeCustomer: true }));
    const response = await RemoveCustomerService(location?.state?.customerId as string);
    setIsLoading((prev) => ({ ...prev, removeCustomer: false }));
    if (response) {
      navigate({ pathname: CUSTOMERS });
      toast.success(`The customer was removed successfully`, {
        theme: "colored",
      });
    } else {
      toast.error(`Failed to remove customer`, {
        theme: "colored",
      });
    }
  };

  const editData: EditObjectType = {
    first_name: customerDetails?.first_name,
    last_name: customerDetails?.last_name,
    phone_number: customerDetails?.phone_number,
    dob: customerDetails?.dob,
    states: customerDetails?.states,
  };

  const openEditModal = () => {
    dispatch(settingSlice.actions.setAddCustomerModalState(true));
    dispatch(settingSlice.actions.setEditCustomer(location?.state?.customerId as string));
    dispatch(settingSlice.actions.setEditDataObject(editData));
    setIsOpen((prev) => ({ ...prev, editCustomer: modalState }));
  };

  return (
    <div className="flex bg-mainBackground h-full  font-Inter customer-details">
      <div className="w-1/3 rounded-lg shadow-pageShadow bg-white h-[410px] mr-3 flex flex-col">
        <div className="h-[193px] bg-greyBlackColor rounded-t-lg flex flex-col justify-between px-6 pt-10 pb-6">
          <div className="flex items-center w-full">
            {!isLoading.customerDetails ? (
              <>
                <div className="flex justify-center items-center bg-interBlack w-12 h-12 rounded border border-greenLightColor">
                  <span className="uppercase text-xl font-semibold text-white">{`${customerDetails?.first_name?.charAt(
                    0
                  )}${customerDetails?.last_name?.charAt(0)}`}</span>
                </div>
                <span className="text-lg font-semibold pl-2 text-white capitalize w-[85%]">{`${capitalizeFirstLetter(
                  customerDetails?.first_name
                )} ${capitalizeFirstLetter(customerDetails?.last_name)}`}</span>
              </>
            ) : (
              <SkeletonTheme baseColor="#f2f4f71a" enableAnimation={false}>
                <Skeleton count={1} height={40} width={350} />
              </SkeletonTheme>
            )}
          </div>
          <div className="flex w-full">
            <button
              className="flex justify-center items-center text-xs mr-2 h-9 font-semibold text-white bg-greyLightColorOpacity hover:bg-[#f2f4f780] rounded w-1/2"
              onClick={openEditModal}
            >
              <img src={EditIcon} alt="" />
              <span className="pl-2">Edit </span>
            </button>
            <button
              onClick={() => handleRemoveCustomerModal(true)}
              className="flex justify-center items-center text-xs ml-2 h-9 font-semibold text-white bg-greyLightColorOpacity hover:bg-[#f2f4f780] rounded w-1/2"
            >
              <img src={DeleteIcon} alt="" />
              <span className="pl-2">Remove </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col p-7">
          <span className="text-base font-semibold text-greyBlackColor">Customer Details</span>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-4">
            <div className="w-1/2">
              <span>Phone</span>
            </div>
            <div className="w-1/2">
              {!isLoading.customerDetails ? (
                <span className="text-greyBlackColor">{formatPhoneNumber(customerDetails?.phone_number)}</span>
              ) : (
                <Skeleton count={1} width={100} height={10} />
              )}
            </div>
          </div>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-3">
            <div className="w-1/2">
              <span>State</span>
            </div>
            <div className="w-1/2">
              {!isLoading.customerDetails ? (
                <span className="text-greyBlackColor">{customerDetails?.states?.name}</span>
              ) : (
                <Skeleton count={1} width={100} height={10} />
              )}
            </div>
          </div>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-3">
            <div className="w-1/2">
              <span>DOB, Age</span>
            </div>
            <div className="w-1/2">
              {!isLoading.customerDetails ? (
                <span className="text-greyBlackColor">
                  {`${formatDate(String(customerDetails?.dob), false)}, ${calculateAge(customerDetails?.dob)}`}
                </span>
              ) : (
                <Skeleton count={1} width={100} height={10} />
              )}
            </div>
          </div>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-3">
            <div className="w-1/2">
              <span>Date Added</span>
            </div>
            <div className="w-1/2">
              {!isLoading.customerDetails ? (
                <span className="text-greyBlackColor">{formatDate(String(customerDetails?.createdAt), false)}</span>
              ) : (
                <Skeleton count={1} width={100} height={10} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 rounded-lg shadow-pageShadow bg-white ml-3 flex flex-col">
        <div className="flex justify-between items-center p-7">
          <div>
            <h2 className="font-semibold text-lg text-greyBlackColor">HECM Reports</h2>
          </div>
          <button className="flex border border-buttonColorGreen text-buttonColorGreen hover:border-buttonLightGreen items-center h-12 px-6 rounded bg-white">
            <div className="mr-4">
              <img src={ReportIcon} alt="*" className="w-4 h-5" />
            </div>
            <p className=" font-Inter font-semibold text-base">New Report</p>
          </button>
        </div>

        <div className="flex flex-col h-screen font-Inter">
          <div className="py-4 px-7 w-full">
            <SearchInput name="search" placeholder="Search by report ID" value={searchQuery} onSearch={handleSearch} />
          </div>
          <div className="flex flex-col">
            <div className="flex w-full items-center bg-interLightBlack px-4 h-8">
              {proposalsList && (
                <div className="flex w-full">
                  <div className="w-3/12">
                    <TableRowHeader title={"ID"} sort={false} />
                  </div>
                  <div className="w-3/12">
                    <TableRowHeader title={"Purpose"} sort={false} />
                  </div>
                  <div className="w-3/12">
                    <TableRowHeader title={"Amount"} sort={false} />
                  </div>
                  <div className="w-3/12 flex ">
                    <TableRowHeader title={"Last report"} sort={false} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col table-layout overflow-y-auto">
              {Boolean(proposalsList) ? (
                <>
                  {currentItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex border-b border-sideNavButtonBg w-full items-center justify-between h-14 min-h-[56px] px-4"
                    >
                      <div className="flex items-center w-3/12">
                        <span className="text-sm font-semibold text-interBlack capitalize pl-2">{item?.id}</span>
                      </div>
                      <div className="w-3/12 flex items-center ">
                        <span className="text-sm font-medium text-greyWhiteColor capitalize">Purchase</span>
                      </div>
                      <div className="w-3/12 flex items-center ">
                        <span className="text-sm font-medium text-interBlack capitalize">$ 140 M</span>
                      </div>

                      <div className="w-3/12 flex items-center justify-between">
                        <span className="text-sm font-medium text-greyBlackColor ">3 mins ago</span>
                        <img src={ArrowIcon} className="w-2 h-3 mr-8 cursor-pointer" alt="" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="flex flex-col h-full  items-center">
                    <img className="mt-10" src={NoDataIcon} alt="" />
                    <h2 className="text-interBlack text-xl font-medium py-2">No Proposal Yet</h2>
                  </div>
                </>
              )}
            </div>

            {Boolean(proposalsList) && (
              <div className="flex justify-between items-center  h-14 px-4">
                <div className="flex items-center">
                  <span className="text-xs font-medium text-greyBlackLightColor">
                    Page {currentPage} of {Math.ceil(searchResults.length / itemsPerPage)} (Items {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, searchResults.length)} of {searchResults.length})
                  </span>
                  <span className="text-xs font-medium text-greyBlackLightColor pl-3">Go to page</span>
                  <input
                    type={InputTypes.NUMBER}
                    ref={pageRef}
                    autoFocus
                    id="pageInput"
                    className="border border-buttonLightGreen rounded-md text-xs px-2 h-7 mx-2 w-9 focus:outline-none"
                  />
                  <div className="flex items-center cursor-pointer" onClick={handleGoToPage}>
                    <span className="text-xs font-medium text-interBlack mr-1">Go</span>
                    <img src={ArrowIcon} className="w-1" alt="" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen.editCustomer}
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
        <AddCustomer />
      </Modal>

      <Modal
        isOpen={modalIsOpen.removeCustomer}
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
        <RemoveCustomer
          setIsOpen={setIsOpen}
          handleRemoveCustomer={handleRemoveCustomer}
          isButtonLoading={isLoading.removeCustomer}
        />
      </Modal>
    </div>
  );
};

export default CustomerDetails;
