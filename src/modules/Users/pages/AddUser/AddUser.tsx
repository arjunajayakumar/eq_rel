import { Dispatch, Fragment, useMemo, useRef, useState } from "react";
import settingSlice from "@/modules/Settings/store/slice/settings.slice";
import { RootState } from "@/store/index";

import Input from "@/components/Input";
import Button from "@/components/Button/Button";
import Select from "@/components/Select";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { AnyAction } from "redux";

import { GetOrganizationUserRolesService, UserCreateOrganizationUserService } from "../../store/users.service";
import { OrganizationUserBody, UserRoles } from "../../interface/users.interface";

import { emailValidation } from "@/lib/validation";
import { InputTypes } from "@/src/enums/enums";
import { AxiosError } from "axios";
import { LOAN_OFFICER } from "@/lib/constants";

import CloseIcon from "@/src/assets/images/svg/close_icon.svg";

const AddUser = (): JSX.Element => {
  const dispatch: Dispatch<AnyAction> = useAppDispatch();
  const formikRef: any = useRef();

  const { addUser } = useAppSelector((state: RootState) => state.settings.modals);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<UserRoles[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  // Initial values of the form. Note that as of now the value of userRoleId is set as default as the uuid corresponding to that of Loan Officer
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    userRoleId: userRoles?.filter((item) => item?.name.toLocaleLowerCase().trim() === LOAN_OFFICER.toLocaleLowerCase().trim())[0]
      ?.id,
  };

  // Handle service api to get organization user roles
  const handleRoles = async (): Promise<void> => {
    try {
      const response = await GetOrganizationUserRolesService();
      setUserRoles(response);
    } catch (err) {
      toast.error((err as AxiosError).message, { theme: "colored" });
    }
  };

  // Call the handleRole() function when a user opens the 'Add User' modal
  useMemo(() => {
    if (addUser && !userRoles.length) {
      handleRoles();
    }
  }, [addUser, userRoles]);

  // Handle closing of the modal
  const handleCloseModal = (): void => {
    dispatch(settingSlice.actions.setAddUserModalState(false));
  };

  // Handle the create user api and to submit the values from the form
  const handleSubmit = async (values: typeof initialValues): Promise<void> => {
    if (initialValues.userRoleId) {
      setIsLoading(true);
      const body: OrganizationUserBody = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        user_role_id: initialValues.userRoleId,
      };

      const successToastMessage: string = "User account created and invitation sent successfully";
      try {
        const response = await UserCreateOrganizationUserService(body);
        handleCloseModal();
        if (response) {
          toast.success(successToastMessage, {
            theme: "colored",
          });
          // handleLogout();
        }
      } catch (err) {
        toast.error((err as AxiosError).message, { theme: "colored" });
      }
      setIsLoading(false);
    }
    return;
  };

  return (
    <Fragment>
      <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={addUserSchema}>
        {({ errors, handleBlur, handleChange, touched, values }): JSX.Element => (
          <Form className="relative z-10 ">
            <div className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-[413px]">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex justify-end" onClick={handleCloseModal}>
                  <img src={CloseIcon} alt="" className="cursor-pointer" />
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left w-full">
                    <h3 className="text-xl font-semibold leading-6 text-blackLightColor" id="modal-title">
                      Add User
                    </h3>

                    <div className="text-greyWhiteColor text-xs mt-1 leading-2">Invite new user under your organization</div>

                    <div className="flex flex-col mt-5">
                      <div className="w-full flex">
                        <div className="w-1/2 mr-1">
                          <Input
                            placeholder="First name"
                            label="Name"
                            id="firstName"
                            name="firstName"
                            type={InputTypes.TEXT}
                            value={values.firstName}
                            labelHide={true}
                            inputIcon={false}
                            errors={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              borderColor: `${errors.firstName && touched.firstName ? "#FF3E1D" : ""}`,
                            }}
                            autoFocus
                          />
                        </div>

                        <div className="w-1/2 ml-1">
                          <Input
                            placeholder="Last name"
                            label=""
                            id="lastName"
                            name="lastName"
                            type={InputTypes.TEXT}
                            value={values.lastName}
                            labelHide={true}
                            inputIcon={false}
                            errors={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{
                              borderColor: `${errors.lastName && touched.lastName ? "#FF3E1D" : ""}`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-full flex mt-5">
                        <Input
                          placeholder="Email"
                          label="Email"
                          id={InputTypes.EMAIL}
                          name={InputTypes.EMAIL}
                          type={InputTypes.TEXT}
                          value={values.email}
                          labelHide={true}
                          inputIcon={false}
                          errors={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          style={{
                            borderColor: `${errors.email && touched.email ? "#FF3E1D" : ""}`,
                          }}
                        />
                      </div>

                      <div className="w-full flex-col flex mt-5">
                        <Select
                          name={"Role"}
                          label="Role"
                          labelHide={true}
                          options={userRoles}
                          selected={selectedRole}
                          setSelected={setSelectedRole}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 pt-5 pb-6 flex sm:px-6 w-full">
                <Button
                  text="Cancel"
                  type="submit"
                  onClick={handleCloseModal}
                  className="inline-flex w-1/2 mr-3 h-46 border border-greyLightColor hover:border-redErrorColor hover:text-redErrorColor justify-center items-center text-interBlack text-sm rounded"
                />

                <Button
                  text={"Invite User"}
                  type="submit"
                  disabled={isLoading}
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

export default AddUser;

const addUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is mandatory")
    .matches(/^[A-Za-z]+$/, "First name should not include any special characters or numbers")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is mandatory")
    .matches(/^[A-Za-z]+$/, "Last name should not include any special characters or numbers")
    .max(50, "Last name cannot exceed 50 characters"),
  email: Yup.lazy((value: string) => {
    if (value?.includes("@")) {
      return Yup.string()
        .email("Invalid email address")
        .max(255)
        .matches(emailValidation, "Invalid email address")
        .required("Email is required");
    }

    return Yup.string().required("Email is required").matches(emailValidation, "Enter a valid email address").trim();
  }),
});
