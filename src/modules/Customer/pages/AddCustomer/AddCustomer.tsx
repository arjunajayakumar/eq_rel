import { Dispatch, Fragment, useRef, useState } from "react";
import { AnyAction } from "redux";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";

import AutoCompleteInput from "@/components/AutoCompleteInput";
import Input from "@/components/Input";
import Button from "@/components/Button/Button";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { AddNewCustomer, EditCustomerService } from "../../services/customer.service";
import { calculateAge, capitalizeFirstLetter } from "@/lib/helper";
import { AddCustomerDetails, AddCustomerInitialValues } from "../../interface/customer.interface";
import { InputTypes } from "@/src/enums/enums";
import { COUNTRY_CODE } from "@/lib/constants";

import ErrorInputText from "@/components/ErrorInputText/ErrorInputText";
import CloseIcon from "@/src/assets/images/svg/close_icon.svg";
import { RootState } from "@/store/index";

const AddCustomer = (): JSX.Element => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const formikRef: any = useRef();
  const errorInputClassName = "auto-complete-box";
  const editCustomerId = useAppSelector((state: RootState) => state.settings.customerId);
  const editData = useAppSelector((state: RootState) => state.settings.editData);

  // Condition to pass in edit values into the form if it is available
  const initialValues: AddCustomerInitialValues = {
    first_name: editData?.first_name ? editData?.first_name : "",
    last_name: editData?.last_name ? editData?.last_name : "",
    phone_number: editData?.phone_number ? editData?.phone_number : "",
    dob: editData?.dob ? new Date(editData.dob) : null,
    state: editData?.states?.id ? editData.states.id : "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Handle and calculate age for edit customer details
  const [age, setAge] = useState<string>(editData?.dob ? calculateAge(editData?.dob) : "");

  // Handle closing the modal via redux state
  const handleClose = (): void => {
    dispatch(settingSlice.actions.setAddCustomerModalState(false));
    dispatch(settingSlice.actions.setEditCustomer(""));
    clearEditDataFromStore();
  };

  // Handling the inputs for Date Picker and State auto complete form
  const handleFieldChange = (field: keyof AddCustomerInitialValues, value: any): void => {
    formikRef.current?.setFieldValue(field, value);
    if (field === "dob") {
      setAge(calculateAge(value));
    }
  };

  // Checking the blur condition for Date Picker and State auto complete form
  const handleFieldBlur = (touched: any, newField: keyof AddCustomerInitialValues): void => {
    formikRef.current?.setTouched({ ...touched, [newField]: true });
  };

  // Clear edit data from store
  const clearEditDataFromStore = (): void => {
    dispatch(
      settingSlice.actions.setEditDataObject({
        first_name: "",
        last_name: "",
        phone_number: "",
        dob: null,
        states: {
          id: "",
          name: "",
        },
      })
    );
  };

  // Handle add customer and edit customer
  const handleSubmit = async (values: AddCustomerInitialValues): Promise<void> => {
    if (!editCustomerId) clearEditDataFromStore();
    setIsLoading(true);
    const body: AddCustomerDetails = {
      first_name: values.first_name,
      last_name: values.last_name,
      dob: values.dob ? values.dob.toISOString() : "",
      country_code: COUNTRY_CODE,
      phone_number: String(values.phone_number),
      state_id: values.state ? values.state : "",
    };
    const toastSuccessMessage: string = !editCustomerId
      ? `${capitalizeFirstLetter(values.first_name)} ${capitalizeFirstLetter(values.last_name)} is added to the customer list`
      : "The customer details updated successfully";
    try {
      if (!editCustomerId) {
        const response = await AddNewCustomer(body);
        if (response) {
          dispatch(settingSlice.actions.invokeCustomersList(true));
        }
      } else {
        await EditCustomerService(body, editCustomerId);
      }
      if (editCustomerId) {
        dispatch(settingSlice.actions.invokeCustomerDetails(true));
        dispatch(settingSlice.actions.setEditCustomer(""));
      }
      handleClose();
      toast.success(toastSuccessMessage, {
        theme: "colored",
      });
    } catch (err) {
      toast.error((err as any).message, { theme: "colored" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addCustomerSchema}>
        {({ errors, handleBlur, handleChange, touched, values }): JSX.Element => (
          <Form className="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[531px]">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex justify-end">
                  <img src={CloseIcon} alt="" className="cursor-pointer" onClick={handleClose} />
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full">
                    <h3 className="text-xl font-semibold leading-6 text-blackLightColor" id="modal-title">
                      {`${Boolean(editCustomerId) ? "Edit customer" : "Add new customer"}`}
                    </h3>
                    {!Boolean(editCustomerId) && (
                      <div className="text-greyWhiteColor text-xs mt-1 leading-2">
                        Enter details of the new customer. All fields are mandatory. <br />
                        New customer will be added to the customer list
                      </div>
                    )}
                    <div className="flex flex-col mt-5">
                      <div className="w-full flex">
                        <div className="w-1/2 mr-1">
                          <Input
                            placeholder="First name"
                            label="Name"
                            id="first_name"
                            name="first_name"
                            type={InputTypes.TEXT}
                            value={values.first_name}
                            errors={Boolean(touched.first_name && errors.first_name)}
                            helperText={touched.first_name && errors.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                          />
                        </div>

                        <div className="w-1/2 ml-1">
                          <Input
                            placeholder="Last name"
                            label=""
                            id="last_name"
                            name="last_name"
                            type={InputTypes.TEXT}
                            value={values.last_name}
                            errors={Boolean(touched.last_name && errors.last_name)}
                            helperText={touched.last_name && errors.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>

                      <div className="w-full flex-col flex mt-4">
                        <div className="flex w-full">
                          <div className="w-1/5 mr-1">
                            <Input
                              placeholder="US : +1"
                              label="Phone"
                              id="country_code"
                              name="country_code"
                              type={InputTypes.TEXT}
                              value="US: +1"
                              disabled
                            />
                          </div>

                          <div className="w-4/5 ml-1">
                            <Input
                              placeholder="Phone"
                              label=""
                              id="phone_number"
                              name="phone_number"
                              type={InputTypes.NUMBER}
                              value={String(values.phone_number)}
                              errors={Boolean(touched.phone_number && errors.phone_number)}
                              helperText={touched.phone_number && errors.phone_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex-col flex mt-4">
                        <div className="text-greyLightDarkColor font-semibold text-xs  h-6">Date of Birth</div>
                        <div
                          className="w-full calender-box"
                          style={{
                            borderColor: `${values.dob ? (touched.dob && errors.dob ? "#FF3E1D" : "#21BD7A") : ""}`,
                          }}
                        >
                          <div className="relative">
                            <span className="absolute right-14 top-3 text-xs font-medium text-greyThinLightColor">{age}</span>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  value={values.dob && dayjs(values.dob)}
                                  onChange={(newValue: any) => handleFieldChange("dob", newValue.toDate())}
                                  onClose={() => handleFieldBlur(touched, "dob")}
                                  onOpen={() => handleFieldBlur(touched, "dob")}
                                  disableFuture
                                  slotProps={{
                                    textField: {
                                      helperText: errors.dob,
                                    },
                                  }}
                                />
                              </DemoContainer>
                            </LocalizationProvider>

                            {errors.dob && touched.dob && (
                              <p className="text-redErrorColor font-normal text-small absolute font-Inter mt-0.287 pl-1">
                                {errors.dob}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex-col flex mt-4">
                        <div className="text-greyLightDarkColor text-xs font-semibold h-6">State</div>
                        <div className="w-full relative">
                          <AutoCompleteInput
                            errorInput={errorInputClassName}
                            selectedState={editData?.states?.name}
                            setSelectedState={(val: { id: string; name: string }) => {
                              handleFieldChange("state", val.id);
                            }}
                            setTouched={() => handleFieldBlur(touched, "state")}
                          />
                          {errors.state && touched.state && <ErrorInputText errorMsg={errors.state} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 pt-5 pb-6 flex sm:px-6 w-full">
                <Button
                  text="Cancel"
                  type="submit"
                  className="inline-flex w-1/2 mr-3 h-46 border border-greyLightColor hover:border-redErrorColor hover:text-redErrorColor justify-center items-center text-interBlack text-sm rounded"
                  onClick={handleClose}
                />

                <Button
                  text={editCustomerId ? "Edit Customer" : "Add Customer"}
                  type="submit"
                  isLoading={isLoading}
                  className={`inline-flex w-1/2 ml-3 h-46 border border-buttonLightGreen ${
                    !isLoading && "hover:bg-white hover:text-buttonLightGreen"
                  }   bg-buttonLightGreen justify-center items-center text-white text-sm rounded `}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

const addCustomerSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is mandatory")
    .matches(/^[A-Za-z]+$/, "First name should not include any special characters or numbers")
    .max(50, "First name cannot exceed 50 characters"),
  last_name: Yup.string()
    .required("Last name is mandatory")
    .matches(/^[A-Za-z]+$/, "Last name should not include any special characters or numbers")
    .max(50, "Last name cannot exceed 50 characters"),
  phone_number: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is mandatory")
    .min(10, "Phone number must have 10 digits")
    .max(10, "Phone number cannot exceed 10 digits"),
  dob: Yup.date().required("Date of birth is required"),
  state: Yup.string().required("State is required"),
});

export default AddCustomer;
