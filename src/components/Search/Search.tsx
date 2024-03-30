import { ChangeEvent, InputHTMLAttributes } from "react";
import SearchIcon from "../../assets/images/svg/search_icon.svg";

export interface Props<T = unknown> extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  disabled?: boolean;
  value?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch?: (value: string) => void;
}

const SearchInput = <T,>({
  disabled = false,
  placeholder,
  name,
  value,
  type,
  className,
  autoFocus,
  onSearch,
  ...rest
}: Props<T>): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
      console.log(event.target.value);
    }
  };

  return (
    <div className="flex flex-col relative">
      <span className="absolute left-4 top-3">
        <img src={SearchIcon} alt="" />
      </span>
      <input
        className="border w-full h-42 bg-mainBackground focus:outline-none pl-12 pr-3 rounded-lg placeholder:text-[#667085] text-sm text-interBlack"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        type={type}
        autoFocus={autoFocus}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
