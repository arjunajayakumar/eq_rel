import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { EmailAuthProvider, User, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as Yup from "yup";

import Input from "../../Input";
import Button from "@/components/Button";

import { InputTypes, newPasswordCriteria } from "@/src/enums/enums";
import { ChangePasswordInitialValuesTypes, FirebaseErrorLibraryType, NewPasswordConditions } from "@/src/interface/interface";
import {
  _UppercaseRegex,
  passwordValidation,
  _LowercaseRegex,
  _MinimumLengthRegex,
  _NumberRegex,
  _SpecialCharRegex,
} from "@/lib/validation";
import { FirebaseError } from "firebase/app";
import { FirebaseErrorLibrary } from "@/lib/errorCodes";

import CloseIcon from "../../../assets/images/svg/close_icon.svg";
import CheckIcon from "../../../assets/images/svg/round_green_icon.svg";
import UnCheckIcon from "../../../assets/images/svg/round_grey_icon.svg";

const ChangePassword = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }): JSX.Element => {
  const [inputType, setInputType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useMemo((): void => {
    if (inputType === InputTypes.PASSWORD) {
      setShowPassword(true);
    } else if (inputType === InputTypes.TEXT) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }, [inputType]);

  // Initial values for the input fields in the change password form
  const initialValues: ChangePasswordInitialValuesTypes = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  // Handle current user re-authentication to firebase
  const handleReAuthentication = async () => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user?.email ? user?.email : "", values.currentPassword as string);
      try {
        return await reauthenticateWithCredential(user, credential);
      } catch (err) {
        setIsLoading(false);
        const errorCode = { ...(err as FirebaseError) }.code as string;
        toast.error(
          FirebaseErrorLibrary.filter(
            (item: FirebaseErrorLibraryType) => item.code.toLocaleLowerCase().trim() === errorCode.toLocaleLowerCase().trim()
          )[0].message,
          { theme: "colored" }
        );
      }
    }
  };

  // Handling submit for change password
  const onSubmit = async (values: ChangePasswordInitialValuesTypes) => {
    if (values.currentPassword === values.newPassword) {
      toast.error("The current password and new password cannot be the same", {
        theme: "colored",
      });
      return;
    }
    setIsLoading(true);
    const reAuthenticateResponse = await handleReAuthentication();
    if (reAuthenticateResponse) {
      setIsLoading(true);
      const auth = getAuth();
      const { newPassword } = values;
      const user: User | null = auth.currentUser;
      if (user) {
        try {
          await updatePassword(user, newPassword);
          toast.success("The password was updated successfully", {
            theme: "colored",
          });
        } catch (err) {
          toast.error("Failed to change password", {
            theme: "colored",
          });
        }
      }
      setIsOpen(false);
    }
    return;
  };

  // Destructuring items from useFormik() hook
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit,
  });

  // Conditions to check each acceptance criteria for newPassword
  const satisfiedCondition = useMemo((): NewPasswordConditions[] => {
    const { newPassword } = values;
    const conditions: NewPasswordConditions[] = [];

    if (_UppercaseRegex.test(newPassword)) conditions.push(newPasswordCriteria.UPPERCASE);
    if (_LowercaseRegex.test(newPassword)) conditions.push(newPasswordCriteria.LOWERCASE);
    if (_NumberRegex.test(newPassword)) conditions.push(newPasswordCriteria.NUMBER);
    if (_SpecialCharRegex.test(newPassword)) conditions.push(newPasswordCriteria.SPECIAL_CHARACTERS);
    if (_MinimumLengthRegex.test(newPassword)) conditions.push(newPasswordCriteria.MINIMUM_LENGTH);

    return conditions;
  }, [values.newPassword]);

  return (
    <form>
      <div className="relative transform overflow-hidden bg-white rounded-lg shadow-xl transition-all w-[367px] font-Inter">
        <div className="p-6 ">
          <div className="mt-3 text-left">
            <img src={CloseIcon} alt="*" className="cursor-pointer absolute right-5 top-6" onClick={() => setIsOpen(false)} />
            <h3 className="text-xl font-semibold leading-6 text-blackDarkColor" id="modal-title">
              Change Password
            </h3>
            <div className="mt-2">
              <p className="text-xs font-medium text-greyBlackLightColor leading-normal">
                Enter your current password to change the password
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Enter your current password"
              label="Current Password"
              id="currentPassword"
              name="currentPassword"
              type={InputTypes.PASSWORD}
              value={values.currentPassword}
              labelHide={true}
              inputIcon={true}
              colorLabel="text-interBlack"
              errors={Boolean(touched.currentPassword && errors.currentPassword)}
              helperText={touched.currentPassword && errors.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              inputType={inputType}
              setInputType={setInputType}
              showPasswordToggle={showPassword}
              autoFocus
              style={{
                borderColor: `${touched.currentPassword ? (errors.currentPassword ? "#FF3E1D" : "rgb(33, 189, 122)") : ""}`,
              }}
            />
          </div>

          <div className="mt-4">
            <Input
              placeholder="Enter your new password"
              label="New Password"
              id="newPassword"
              name="newPassword"
              type={InputTypes.PASSWORD}
              value={values.newPassword}
              labelHide={true}
              inputIcon={false}
              colorLabel="text-interBlack"
              errors={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              inputType={inputType}
              setInputType={setInputType}
              style={{
                borderColor: `${touched.newPassword ? (errors.newPassword ? "#FF3E1D" : "rgb(33, 189, 122)") : ""}`,
              }}
            />
          </div>

          <div className="mt-4">
            <Input
              placeholder="Confirm your password"
              label="Confirm New Password"
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

          <div className="flex flex-col font-medium mt-4">
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
                {values.newPassword === values.confirmPassword && values.confirmPassword !== "" ? (
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
        </div>

        <div className=" pb-6 flex px-6 w-full">
          <Button
            text="Change Password"
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="inline-flex justify-center items-center h-9 rounded bg-buttonLightGreen text-sm font-medium text-white w-full"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
        </div>
      </div>
    </form>
  );
};

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(passwordValidation, "The password criteria is not met. It must contain a mix of letters, numbers, and symbols"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});

export default ChangePassword;
