import { Dispatch, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AnyAction } from "redux";
import { RootState } from "@/store/index";

import SearchInput from "@/components/Search";
import TableRowHeader from "@/components/Table";
import Button from "@/components/Button";

import { ListCustomer } from "../../services/customer.service";
import { CustomerListTypes, CustomerListParams } from "../../interface/customer.interface";
import {
  calculateAge,
  capitalizeFirstLetter,
  convertDateToHoursOrSeconds,
  formatDate,
  formatPhoneNumber,
  randomBGColor,
  randomTextColor,
} from "@/lib/helper";
import { CUSTOMERS, CUSTOMER_DETAILS } from "@/src/routes/routesConstants";
import { CUSTOMERS_DATA, LIMIT } from "@/lib/constants";
import { InputTypes } from "@/src/enums/enums";

import { Tooltip } from "react-tooltip";
import Skeleton from "react-loading-skeleton";
import "react-tooltip/dist/react-tooltip.css";
import "react-loading-skeleton/dist/skeleton.css";

import ArrowIcon from "../../../../assets/images/svg/arrow_icon.svg";
import NoDataIcon from "../../../../assets/images/svg/noCustomer_icon.svg";

const CustomerList = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [customerList, setCustomerList] = useState<CustomerListTypes>({} as CustomerListTypes);
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNoData, setIsNoData] = useState<boolean>(false);

  const pageRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const limit = LIMIT;
  const offset = currentPage * limit;
  const totalPages = Math.ceil(customerList?.count / limit);
  const indexOfLastItem = offset + customerList?.rows?.length;
  const callCustomers = useAppSelector((state: RootState) => state.settings.invokeCustomersList);

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const handleGoToPage = (): void => {
    if (parseInt(pageRef.current.value) !== 0 && parseInt(pageRef.current.value) <= totalPages)
      setCurrentPage(parseInt(pageRef.current.value) - 1);
  };

  const handleSearch = (value: string): void => {
    setCurrentPage(0);
    setSearchQuery(value);
  };

  const params: CustomerListParams = useMemo(
    () => ({
      page: currentPage,
      search: searchQuery,
      order: order ? order : "Desc",
      sort: sort ? sort : "last_report_created_date",
    }),
    [currentPage, searchQuery, order, sort]
  );

  useEffect(() => {
    handleCustomersList();
  }, [params]);

  const handleCustomersList = async (): Promise<void> => {
    setIsLoading(true);
    const response: CustomerListTypes = await ListCustomer(params);
    if (response) {
      setIsLoading(false);
      setCustomerList(response as CustomerListTypes);
      // To change the value of invokeCustomersList state in redux to false so as to prevent unnecessary call of the handleCustomersList() function
      dispatch(settingSlice.actions.invokeCustomersList(false));
      if (!response?.rows?.length) {
        setIsNoData(true);
      }
      setIsNoData(false);
    }
    setIsLoading(false);
  };

  const handCustomerDetails = (e: React.MouseEvent<HTMLDivElement>, id: string): void => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${CUSTOMER_DETAILS}/{${id}}`, { state: { customerId: id } });
  };

  useEffect((): void => {
    handleCustomersList();
  }, [window.location.host.includes(CUSTOMERS)]);

  useMemo((): void => {
    if (order) handleCustomersList();
  }, [order]);

  useMemo((): void => {
    if (sort) handleCustomersList();
  }, [sort]);

  useMemo((): void => {
    if (Boolean(callCustomers)) handleCustomersList();
  }, [callCustomers]);

  useMemo((): void => {
    handleCustomersList();
  }, [currentPage]);

  return (
    <div className="flex flex-col h-screen font-Inter">
      <div className="p-4 w-[460px]">
        <SearchInput
          name="search"
          placeholder="Search by Name, Phone number or State"
          value={searchQuery}
          onSearch={handleSearch}
          autoFocus={true}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex w-full items-center bg-interLightBlack px-4 h-8">
          {Boolean(customerList?.rows?.length) && (
            <div className="flex w-full">
              <div className="w-2/5">
                <TableRowHeader title={"Customer"} sort={true} setOrder={setOrder} setSort={setSort} order={order} />
              </div>
              <div className="w-1/5">
                <TableRowHeader title={"Phone"} sort={false} setOrder={setOrder} setSort={setSort} order={order} />
              </div>
              <div className="w-1/5">
                <TableRowHeader title={"State"} sort={false} setOrder={setOrder} setSort={setSort} order={order} />
              </div>
              <div className="w-14">
                <TableRowHeader title={"Age"} sort={true} setOrder={setOrder} setSort={setSort} order={order} />
              </div>
              <div className="w-1/5 flex justify-center">
                <TableRowHeader title={"Last report"} sort={true} setOrder={setOrder} setSort={setSort} order={order} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col table-layout overflow-y-auto">
          {!isNoData && customerList?.rows?.length ? (
            <div>
              {customerList?.rows?.map((item, index) => (
                <div
                  key={index}
                  className="flex border-b border-sideNavButtonBg w-full items-center justify-between h-14 min-h-[56px] px-4 cursor-pointer"
                  onClick={(e) => handCustomerDetails(e, item?.id)}
                >
                  <div className="flex items-center w-2/5">
                    {!isLoading ? (
                      <div className="flex items-center w-full">
                        <div
                          className="h-33 w-33 rounded-md flex items-center justify-center font-semibold"
                          style={{ backgroundColor: randomBGColor(item?.first_name[0]) }}
                        >
                          <span className="uppercase text-xs" style={{ color: randomTextColor() }}>
                            {item?.first_name
                              .split(" ")
                              .map((namePart) => namePart.charAt(0))
                              .join("")}
                          </span>
                        </div>
                        <div className=" w-[85%]">
                        <span className="text-sm font-semibold text-interBlack capitalize pl-2">{`${capitalizeFirstLetter(
                          item?.first_name
                        )} ${capitalizeFirstLetter(item?.last_name)}`}</span></div>
                      </div>
                    ) : (
                      <Skeleton count={1} width={300} height={25} />
                    )}
                  </div>
                  <div className="w-1/5 flex items-center ">
                    {!isLoading ? (
                      <span className="text-sm font-medium text-greyWhiteColor capitalize">
                        {formatPhoneNumber(item?.phone_number)}
                      </span>
                    ) : (
                      <Skeleton count={1} width={150} height={25} />
                    )}
                  </div>
                  <div className="w-1/5 flex items-center ">
                    {!isLoading ? (
                      <span className="text-sm font-medium text-interBlack capitalize">{item?.states?.name}</span>
                    ) : (
                      <Skeleton count={1} width={150} height={25} />
                    )}
                  </div>
                  <div className="w-14 flex items-center ">
                    {!isLoading ? (
                      <span className="text-sm font-medium text-interBlack capitalize">{calculateAge(item?.dob)}</span>
                    ) : (
                      <Skeleton count={1} width={70} height={25} />
                    )}
                  </div>
                  <div className="w-1/5 flex items-center justify-center">
                    {!isLoading ? (
                      <span
                        className="text-sm font-medium text-greyBlackColor cursor-pointer"
                        data-tooltip-id={`${
                          convertDateToHoursOrSeconds(
                            item?.last_report_created_date ? new Date(item?.last_report_created_date) : new Date()
                          ) !== "--" && "date-tooltip"
                        }`}
                        data-tooltip-content={formatDate(String(item?.last_report_created_date), true)}
                      >
                        {convertDateToHoursOrSeconds(
                          item?.last_report_created_date ? new Date(item?.last_report_created_date) : new Date()
                        )}
                      </span>
                    ) : (
                      <Skeleton count={1} width={150} height={25} />
                    )}
                    <Tooltip id="date-tooltip" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full  items-center">
            <img className="mt-20 w-[163px] h-[71px]" src={NoDataIcon} alt="" />
              <h2 className="text-interBlack text-xl font-medium py-2">No Customer Yet</h2>

              <span className="text-greyBlackColor text-sm font-medium text-center">
                {`Click "${CUSTOMERS_DATA.buttonText}" to add new customer`} <br /> details
              </span>
            </div>
          )}
        </div>

        {customerList?.count > limit && (
          <div className="flex justify-between items-center border-t border-sideNavButtonBg h-14 px-4">
            <div className="flex items-center">
              {Boolean(customerList?.rows?.length) && (
                <span className="text-xs font-medium text-greyBlackLightColor">
                  Page {currentPage + 1} of {Math.ceil(customerList?.count / limit)} (Items {1 + offset} to {indexOfLastItem} of{" "}
                  {customerList?.count})
                </span>
              )}
              <span className="text-xs font-medium text-greyBlackLightColor pl-3">Go to page</span>
              <input
                type={InputTypes.NUMBER}
                ref={pageRef}
                className="border border-buttonLightGreen rounded-md text-xs px-2 h-7 mx-2 w-9 focus:outline-none"
              />
              <div className="flex items-center cursor-pointer" onClick={handleGoToPage}>
                <span className="text-xs font-medium text-interBlack mr-1">Go</span>
                <img src={ArrowIcon} className="w-1" alt="*" />
              </div>
            </div>
            <div className="flex items-center">
              <Button
                text={"Previous"}
                className={` text-greyBlackColor text-xs font-medium rounded h-8 w-20 mr-4 ${
                  currentPage === 0 ? "opacity-80 cursor-not-allowed bg-sideNavButtonBg " : "opacity-100 bg-mainBackground"
                } `}
                onClick={() => {
                  if (currentPage !== 0) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 0}
              />

              <Button
                text={"Next"}
                className={`bg-mainBackground text-greyBlackColor text-xs font-medium rounded h-8 w-20 ${
                  indexOfLastItem >= customerList?.count ? "opacity-80 cursor-not-allowed" : "opacity-100"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={indexOfLastItem >= customerList?.count}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
