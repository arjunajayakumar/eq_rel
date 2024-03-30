import { useMemo, useRef, useState } from "react";
import { FirebaseError } from "firebase/app";
import { FirebaseErrorLibrary } from "@/lib/errorCodes";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Input from "@/components/Input";

import { LoginSchema } from "../../interface/auth.interface";
import { InputTypes } from "@/src/enums/enums";
import { FirebaseErrorLibraryType } from "@/src/interface/interface";
import { emailValidation } from "@/lib/validation";
import { authenticateUser } from "@/lib/interceptors";

import Logo from "@/src/equity_release_logo.svg";
import { useAppDispatch } from "@/hooks/useRedux";
import authSlice from "../../store/slice/auth.slice";

const Login = (): JSX.Element => {
  const formikRef: any = useRef();
  const dispatch = useAppDispatch();
  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const onChangeRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  useMemo((): void => {
    if (inputType === InputTypes.PASSWORD) {
      setShowPassword(true);
    } else if (inputType === InputTypes.TEXT) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }, [inputType]);

  const handleSubmit = async (values: LoginSchema): Promise<void> => {
    setIsLoading(true);
    const response = await authenticateUser(values.email, values.password, rememberMe);
    if (typeof response === "string") {
      dispatch(authSlice.actions.getAuthMe(rememberMe));
    } else {
      setIsLoading(false);
      const errorCode = { ...(response as FirebaseError) }.code as string;
      toast.error(
        FirebaseErrorLibrary.filter(
          (item: FirebaseErrorLibraryType) => item.code.toLocaleLowerCase().trim() === errorCode.toLocaleLowerCase().trim()
        )[0].message,
        { theme: "colored" }
      );
    }
  };

  return (
    <div className="m-auto w-[367px] shadow-card px-6 py-8 flex flex-col justify-center items-center rounded-lg font-Inter bg-white">
      <img className="w-9 h-9" src={Logo} alt="*" />
      <h1 className="text-xl text-blackDarkColor font-semibold pt-2">Welcome Back</h1>
      <small className="text-xs font-medium text-greyBlackLightColor mt-2">Please enter your details to sign in</small>

      <Formik innerRef={formikRef} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={loginSchema}>
        {({ errors, handleBlur, handleChange, touched, values }): JSX.Element => (
          <Form className="w-full mt-6" autoComplete="off">
            <div className="text-interBlack font-semibold text-sm  h-6 flex">
              Email <span className="text-redErrorColor text-xs">*</span>
            </div>
            <Input
              placeholder="Enter your email"
              label=""
              id={InputTypes.EMAIL}
              name={InputTypes.EMAIL}
              type={InputTypes.TEXT}
              value={values.email}
              labelHide={false}
              inputIcon={false}
              errors={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
            <div className="text-interBlack font-semibold text-sm h-6 mt-4 flex">
              Password <span className="text-redErrorColor text-xs">*</span>
            </div>

            <Input
              placeholder="Enter your password"
              label=""
              id={InputTypes.PASSWORD}
              name={InputTypes.PASSWORD}
              type={InputTypes.PASSWORD}
              value={values.password}
              labelHide={false}
              inputIcon={true}
              errors={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              showPasswordToggle={showPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              inputType={inputType}
              setInputType={setInputType}
            />

            <div className="flex w-full justify-between text-xs font-medium pt-4">
              <div className="flex text-interBlack">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="checkbox1"
                  checked={rememberMe}
                  onChange={() => onChangeRememberMe()}
                />
                <label htmlFor="checkbox1">Remember me</label>
              </div>
              <a href="#" className="text-buttonLightGreen cursor-pointer">
                Forgot Password?
              </a>
            </div>

            <Button
              text="Sign In"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className={`inline-flex w-full mt-7 h-9 border border-buttonLightGreen ${
                !isLoading && "hover:bg-white"
              }  hover:text-buttonLightGreen bg-buttonLightGreen justify-center items-center text-white text-sm rounded`}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

const loginSchema = Yup.object().shape({
  email: Yup.lazy((value: string) => {
    if (value?.includes("@")) {
      return Yup.string()
        .email("Enter a valid email address")
        .max(255)
        .matches(emailValidation, "Enter a valid email address")
        .required("Email is required");
    }

    return Yup.string().required("Email is required").matches(emailValidation, "Enter a valid email address").trim();
  }),
  password: Yup.string().required("Password is required"),
});
