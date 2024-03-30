import Spinner from "@/components/Spinner";
import { ButtonProps } from "@/src/interface/interface";

const defaultClasses =
  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 min-w-[100px]";

const Button = ({ text, isLoading, className, children, disabled, ...props }: ButtonProps): JSX.Element => (
  <button type="button" className={className ?? defaultClasses} {...props} disabled={disabled}>
    {isLoading ? <Spinner /> : children ?? text}
  </button>
);

export default Button;
