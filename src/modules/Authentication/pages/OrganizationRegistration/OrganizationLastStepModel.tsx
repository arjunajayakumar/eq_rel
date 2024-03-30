import { useRef, useState } from "react";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import authSlice from "../../store/slice/auth.slice";
import { useAppDispatch } from "@/hooks/useRedux";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { GetUserRolesService, SendUserDetailsService } from "../../service/auth.service";

import { AuthMeResponseTypes } from "../../interface/auth.interface";

import { InputTypes } from "@/src/enums/enums";
import { COUNTRY_CODE } from "@/lib/constants";

const OrganizationLastStepModel = (): JSX.Element => {
  const formikRef: any = useRef();
  const dispatch = useAppDispatch();

  // Initial values for the input fields in the create account form
  const initialValues = {
    phone_number: "",
    nmls: "",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // To redirect the user to the appropriate page based on his role
  const handleRole = async () => {
    try {
      const response = await GetUserRolesService();
      dispatch(authSlice.actions.setAuthMe(response as AuthMeResponseTypes));
      sessionStorage.setItem("userRole", response?.roles?.name);
      return response;
    } catch {}
  };

  // Handle submitting user details
  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    const body = {
      phone_number: String(values.phone_number),
      nmls: String(values.nmls),
      country_code: COUNTRY_CODE,
    };
    const successToastMessage: string = "Credentials saved";
    try {
      const response = await SendUserDetailsService(body as typeof body);
      if (response) {
        const roleResponse = await handleRole();
        if (roleResponse) {
          toast.success(successToastMessage, { theme: "colored" });
        }
        return;
      }
    } catch (err) {
      toast.error((err as AxiosError).message, { theme: "colored" });
    }
    setIsLoading(false);
  };

  return (
    <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={customerDetailsSchema}>
      {({ errors, handleBlur, handleChange, touched, values }): JSX.Element => (
        <Form className="m-auto w-[441px] shadow-card px-6 py-8 flex flex-col justify-center items-start rounded-lg font-Inter bg-white">
          <h1 className="text-xl text-blackDarkColor font-semibold pt-2">One last step</h1>
          <small className="text-xs font-medium text-greyBlackLightColor mt-1">
            Please provide your phone and NMLS to finish setting up your account
          </small>

          <div className="flex flex-col justify-start w-full mt-5 onestep-input-phone relative">
            <span className="z-10 left-4 top-[10px] text-interBlack font-medium text-xs h-full w-5 flex justify-center items-center absolute">
              +1
            </span>
            <Input
              placeholder="(XXX) XXX‑XXXX"
              label="Phone"
              id="phone_number"
              name="phone_number"
              type={InputTypes.NUMBER}
              value={String(values.phone_number)}
              errors={Boolean(touched.phone_number && errors.phone_number)}
              helperText={touched.phone_number && errors.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                borderColor: `${touched.phone_number ? (errors.phone_number ? "#FF3E1D" : "rgb(33, 189, 122)") : ""}`,
              }}
            />
          </div>
          <div className="flex flex-col justify-start w-full mt-4">
            <Input
              placeholder="Enter your NMLS"
              label="NMLS"
              id="nmls"
              name="nmls"
              type={InputTypes.NUMBER}
              value={values.nmls}
              errors={Boolean(touched.nmls && errors.nmls)}
              helperText={touched.nmls && errors.nmls}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                borderColor: `${touched.nmls ? (errors.nmls ? "#FF3E1D" : "rgb(33, 189, 122)") : ""}`,
              }}
            />
          </div>

          <div className="flex w-full mt-6">
            <Button
              text="Let's Go"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className={`inline-flex w-full py-2 border border-buttonLightGreen ${
                !isLoading && "hover:bg-white hover:text-buttonLightGreen"
              }   bg-buttonLightGreen justify-center items-center text-white text-sm rounded `}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrganizationLastStepModel;

const customerDetailsSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is mandatory")
    .min(10, "Phone number must have 10 digits")
    .max(10, "Phone number cannot exceed 10 digits"),
  nmls: Yup.string()
    .required("NMLS is mandatory")
    .min(4, "NMLS should be at least 4 digits")
    .max(12, "NMLS cannot exceed 12 digits"),
});
