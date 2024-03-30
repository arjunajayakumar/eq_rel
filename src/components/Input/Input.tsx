import { InputTypes } from "@/src/enums/enums";
import { InputProps } from "@/src/interface/interface";

import PassWordShowIcon from "@/src/assets/images/svg/passwordShow_icon.svg";
import PassWordHideIcon from "@/src//assets/images/svg/passwordHide_icon.svg";

const Input = <T,>({
  labelHide = true,
  disabled = false,
  placeholder,
  label,
  name,
  value,
  style,
  inputIcon = false,
  showPasswordToggle = true,
  errors,
  helperText,
  type,
  inputType,
  autoFocus,
  setInputType,
  onChange,
  onBlur,
  colorLabel ='text-greyLightDarkColor',
  ...rest
}: InputProps<T>) => {
  return (
    <div className="flex flex-col relative w-full">
      {labelHide && (
        <label className={` ${colorLabel} text-xs pb-1 h-6 flex items-end font-semibold`} htmlFor={name}>
          {label ?? ""}
        </label>
      )}
      <div className="relative">
        <input
          className="border border-greyLightColor rounded py-2 pl-2 pr-9 w-full text-xs h-9 mb-1 focus:outline-none placeholder:text-xs placeholder:text-greyThinLightColor"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          style={style}
          autoFocus={autoFocus}
          onChange={onChange}
          onBlur={onBlur}
          type={inputType ? inputType : type}
          {...rest}
        />
        {inputIcon && (
          <span className="cursor-pointer">
            {showPasswordToggle ? (
              
              <img
              src={PassWordHideIcon}
              alt="Hide Password"
              className="absolute top-2 right-3 mt-[-1px]"
              onClick={() => {
                setInputType && setInputType(InputTypes.TEXT);
              }}
             
            />
            ) : (
              <img
              src={PassWordShowIcon}
              alt="Show Password"
              className="absolute top-2 right-3 mt-[-1px]"
              onClick={() => {
                setInputType && setInputType(InputTypes.PASSWORD);
              }}
            />
            )}
          </span>
        )}

{errors && <p className="text-redErrorColor absolute top-[37px] font-normal text-small font-Inter mt-0.287">{helperText}</p>}
      </div>
     
    </div>
  );
};
export default Input;
