import { LOAN_OFFICER } from "@/lib/constants";
import { InputProps } from "@/src/interface/interface";

const Select = ({
  name,
  label,
  labelHide = false,
  options,
  selected,
  setSelected,
  colorLabel = "text-greyLightDarkColor",
}: InputProps): JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      {labelHide && (
        <label className={` ${colorLabel} text-xs pb-[10px] h-6 flex items-end font-semibold`} htmlFor={name}>
          {label ?? ""}
        </label>
      )}
      <div className="select relative">
        <select
          className=" relative border border-greyLightColor rounded py-2 pl-2 pr-9 w-full text-xs h-9 mb-1 focus:outline-none placeholder:text-xs placeholder:text-greyThinLightColor"
          value={selected}
          onChange={(e) => setSelected && setSelected(e.target.value)}
        >
          <option value="" disabled hidden>
            {LOAN_OFFICER}
          </option>
          {options?.length ? (
            options.map((item: any, index: number) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))
          ) : (
            <option disabled>Loading user roles...</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default Select;
