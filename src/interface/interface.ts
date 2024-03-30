import { Dispatch, ReactElement, SetStateAction } from "react";
import { InputHTMLAttributes } from "react";
import { newPasswordCriteria } from "../enums/enums";

export interface RoutesArray {
  index?: boolean;
  element?: JSX.Element;
  path?: string;
  children?: RoutesArray[];
}

export interface ReactJSXElement {
  children: ReactElement;
}
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface FirebaseErrorLibraryType {
  code: string;
  message: string;
}

export interface InputProps<T = unknown> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  labelHide?: boolean;
  style?: React.CSSProperties;
  inputIcon?: boolean;
  showPasswordToggle?: boolean;
  errors?: boolean;
  helperText?: any;
  inputType?: string;
  setInputType?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any, Element> | undefined) => void;
  colorLabel?: string;
  options?: any;
  selected?: any;
  setSelected?: React.Dispatch<React.SetStateAction<any>>;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ChangePasswordInitialValuesTypes {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ENDPOINT_TYPES {
  AUTH: string;
  CUSTOMER: string;
  STATE: string;
  PROPOSAL: string;
  ORGANIZATION: string;
  USER: string;
  ROLES: string;
}

export type NewPasswordConditions =
  | newPasswordCriteria.UPPERCASE
  | newPasswordCriteria.LOWERCASE
  | newPasswordCriteria.SPECIAL_CHARACTERS
  | newPasswordCriteria.MINIMUM_LENGTH
  | newPasswordCriteria.NUMBER;
