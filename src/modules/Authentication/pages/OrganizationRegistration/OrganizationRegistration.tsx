import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { CreateAccountService } from "../../service/auth.service";

import { InputTypes, newPasswordCriteria } from "@/src/enums/enums";
import { FirebaseErrorLibraryType, NewPasswordConditions } from "@/src/interface/interface";

import {
  _LowercaseRegex,
  _MinimumLengthRegex,
  _NumberRegex,
  _SpecialCharRegex,
  _UppercaseRegex,
  passwordValidation,
} from "@/lib/validation";

import Logo from "@/src/equity_release_logo.svg";
import CheckIcon from "@/src/assets/images/svg/round_green_icon.svg";
import UnCheckIcon from "@/src/assets/images/svg/round_grey_icon.svg";
import { useLocation, useNavigate } from "react-router";
import { SAVE_CREDENTIALS } from "@/src/routes/routesConstants";
import { authenticateUser } from "@/lib/interceptors";
import { FirebaseError } from "firebase/app";
import { FirebaseErrorLibrary } from "@/lib/errorCodes";

const OrganizationRegistration = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [inputType, setInputType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const userValidationDetails = location?.state?.validateUserDetails;

  useMemo((): void => {
    if (inputType === InputTypes.PASSWORD) {
      setShowPassword(true);
    } else if (inputType === InputTypes.TEXT) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }, [inputType]);

  // Initial values for the input fields in the create account form
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleUserLogin = async () => {
    const response = await authenticateUser(userValidationDetails?.email, values.password, true);
    if (typeof response === "string") {
      return response as string;
    } else {
      const errorCode = (response as unknown as FirebaseError).code as string;
      toast.error(
        FirebaseErrorLibrary.filter(
          (item: FirebaseErrorLibraryType) => item.code.toLocaleLowerCase().trim() === errorCode.toLocaleLowerCase().trim()
        )[0].message,
        { theme: "colored" }
      );
    }
  };

  // Handle submit for create account
  const onSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    const params = {
      email: userValidationDetails?.email,
      password: values.password,
      invitation_key: userValidationDetails?.invitation_key,
    };
    const successToastMessage: string = "Password set successfully";

    try {
      const response = await CreateAccountService(params as typeof params);
      if (response) {
        const loginResponse = await handleUserLogin();
        if (loginResponse) {
          navigate(SAVE_CREDENTIALS);
        }
        toast.success(successToastMessage, { theme: "colored" });
      }
    } catch (err) {
      toast.error((err as AxiosError).message, { theme: "colored" });
    }
    setIsLoading(false);
  };

  // Destructuring items from useFormik() hook
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: createAccountSchema,
    onSubmit,
  });

  // Conditions to check each acceptance criteria for newPassword
  const satisfiedCondition = useMemo((): NewPasswordConditions[] => {
    const { password } = values;
    const conditions: NewPasswordConditions[] = [];

    if (_UppercaseRegex.test(password)) conditions.push(newPasswordCriteria.UPPERCASE);
    if (_LowercaseRegex.test(password)) conditions.push(newPasswordCriteria.LOWERCASE);
    if (_NumberRegex.test(password)) conditions.push(newPasswordCriteria.NUMBER);
    if (_SpecialCharRegex.test(password)) conditions.push(newPasswordCriteria.SPECIAL_CHARACTERS);
    if (_MinimumLengthRegex.test(password)) conditions.push(newPasswordCriteria.MINIMUM_LENGTH);

    return conditions;
  }, [values.password]);

  return (
    <div className="m-auto w-[367px] shadow-card px-6 py-8 flex flex-col justify-center items-center rounded-lg font-Inter bg-white">
      <img className="w-9 h-9" src={Logo} alt="*" />
      <h1 className="text-xl text-blackDarkColor font-semibold pt-2">Hi {userValidationDetails?.first_name},</h1>
      <small className="text-xs font-medium text-greyBlackLightColor mt-1">
        Please enter a secure password to create account
      </small>

      <div className="flex justify-start w-full mt-4">
        <span className="text-interBlack text-xs font-semibold">Email</span>
        <span className="text-greyBlackColor text-xs font-medium pl-3">{userValidationDetails?.email}</span>
      </div>
      <div className="flex flex-col justify-start w-full mt-4">
        <Input
          placeholder="Enter your current password"
          label="Password"
          id="password"
          name="password"
          type={InputTypes.PASSWORD}
          value={values.password}
          labelHide={true}
          inputIcon={true}
          colorLabel="text-interBlack"
          errors={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          inputType={inputType}
          setInputType={setInputType}
          showPasswordToggle={showPassword}
          autoFocus
          style={{
            borderColor: `${touched.password ? (errors.password ? "#FF3E1D" : "rgb(33, 189, 122)") : ""}`,
          }}
        />
      </div>
      <div className="flex flex-col justify-start w-full mt-4">
        <Input
          placeholder="Enter your new password"
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type={InputTypes.PASSWORD}
          value={values.confirmPassword}
          labelHide={true}
          inputIcon={true}
          colorLabel="text-interBlack"
          errors={Boolean(touched.confirmPassword && errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          inputType={inputType}
          setInputType={setInputType}
          showPasswordToggle={showPassword}
          style={{
            borderColor: `${touched.confirmPassword ? (errors.confirmPassword ? "#FF3E1D" : "rgb(33, 189, 122)") : ""}`,
          }}
        />
      </div>
      <div className="flex flex-col font-medium my-4 w-full">
        <span className="text-greyBlackColor text-xs mb-2">Password criteria</span>
        <div className="flex w-full">
          <div className="w-1/2 bg-[#F2F4F7] rounded-md flex items-center h[21px] pl-1 mr-1">
            {satisfiedCondition.includes(newPasswordCriteria.LOWERCASE) ? (
              <div>
                <img src={CheckIcon} alt="*" />
              </div>
            ) : (
              <div>
                <img src={UnCheckIcon} alt="*" />
              </div>
            )}
            <span className="text-greyBlackColor text-xs pl-1">lowercase character</span>
          </div>
          <div className="w-1/2 bg-[#F2F4F7] rounded-md flex items-center h-[21px] pl-1 ml-1">
            {satisfiedCondition.includes(newPasswordCriteria.NUMBER) ? (
              <div>
                <img src={CheckIcon} alt="*" />
              </div>
            ) : (
              <div>
                <img src={UnCheckIcon} alt="*" />
              </div>
            )}
            <span className="text-greyBlackColor text-xs pl-1">number</span>
          </div>
        </div>
        <div className="flex w-full mt-1">
          <div className="w-1/2 bg-[#F2F4F7] rounded-md flex items-center h[21px] pl-1 mr-1">
            {satisfiedCondition.includes(newPasswordCriteria.UPPERCASE) ? (
              <div>
                <img src={CheckIcon} alt="*" />
              </div>
            ) : (
              <div>
                <img src={UnCheckIcon} alt="*" />
              </div>
            )}
            <span className="text-greyBlackColor text-xs pl-1">uppercase character</span>
          </div>
          <div className="w-1/2 bg-[#F2F4F7] rounded-md flex items-center h-[21px] pl-1 ml-1">
            {satisfiedCondition.includes(newPasswordCriteria.SPECIAL_CHARACTERS) ? (
              <div>
                <img src={CheckIcon} alt="*" />
              </div>
            ) : (
              <div>
                <img src={UnCheckIcon} alt="*" />
              </div>
            )}
            <span className="text-greyBlackColor text-xs pl-1">special character</span>
          </div>
        </div>
        <div className="flex w-full mt-1">
          <div className="w-1/2 bg-[#F2F4F7] rounded-md flex items-center h[21px] pl-1 mr-1">
            {satisfiedCondition.includes(newPasswordCriteria.MINIMUM_LENGTH) ? (
              <div>
                <img src={CheckIcon} alt="*" />
              </div>
            ) : (
              <div>
                <img src={UnCheckIcon} alt="*" />
              </div>
            )}
            <span className="text-greyBlackColor text-xs pl-1">minimum 8 characters</span>
          </div>
          <div className="w-1/2 bg-[#F2F4F7] rounded-md flex items-center h-[21px] pl-1 ml-1">
            {values.password === values.confirmPassword && values.confirmPassword !== "" ? (
              <div>
                <img src={CheckIcon} alt="*" />
              </div>
            ) : (
              <div>
                <img src={UnCheckIcon} alt="*" />
              </div>
            )}
            <span className="text-greyBlackColor text-xs pl-1">confirm password</span>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-4">
        <Button
          type="submit"
          text="Create Account"
          className="inline-flex justify-center items-center h-9 w-full border border-buttonLightGreen hover:bg-white hover:text-buttonLightGreen rounded bg-buttonLightGreen text-sm font-medium text-white"
          disabled={isLoading}
          isLoading={isLoading}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        />
      </div>
      <div className="text-center mt-5">
        <div className="text-xs font-medium text-greyBlackColor text-center">
          By continuing, you agree to our{" "}
          <a href="" className="text-buttonLightGreen cursor-pointer">
            Terms and conditions
          </a>
        </div>
        <div className="text-xs font-medium text-greyBlackColor text-center">
          and that you have read our{" "}
          <a href="" className="text-buttonLightGreen cursor-pointer">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrganizationRegistration;

const createAccountSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters")
    .matches(passwordValidation, "The password criteria is not met. It must contain a mix of letters, numbers, and symbols"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "The passwords do not match")
    .required("Confirm password is required"),
});
