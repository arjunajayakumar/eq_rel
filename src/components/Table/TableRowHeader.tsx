import { Dispatch, SetStateAction } from "react";

import UpArrowIcon from "../../assets/images/svg/upArrow_icon.svg";
import UpArrowIconFaded from "../../assets/images/svg/upArrow_faded_icon.svg";
import DownArrowIcon from "../../assets/images/svg/downArrow_icon.svg";
import DownArrowIconFaded from "../../assets/images/svg/downArrow_faded_icon.svg";

export interface Props<T = unknown> {
  title: string;
  sort: boolean;
  order?: string;
  setOrder?: Dispatch<SetStateAction<string>>;
  setSort?: Dispatch<SetStateAction<string>>;
}

const TableRowHeader = <T,>({ title, sort, setOrder, setSort }: Props<T>): JSX.Element => {
  const handleTitle = (title: string) => {
    switch (title) {
      case "Customer":
        setSort && setSort("first_name");
        break;

      case "Age":
        setSort && setSort("dob");
        break;

      case "Last report":
        setSort && setSort("last_report_created_date");
        break;

      default:
        break;
    }
  };

  return (
    <div className="flex items-center">
      <span className="text-white text-sm font-medium cursor-pointer" onClick={() => handleTitle(title)}>
        {title}
      </span>
      {sort && (
        <div className="flex flex-col pl-2">
          <span
            className="cursor-pointer"
            onClick={() => {
              setOrder && setOrder("Asc");
              handleTitle(title);
            }}
          >
            <img src={UpArrowIcon} alt="*" />
            {/* <img src={UpArrowIconFaded} alt="*" /> */}
          </span>
          <span
            className="pt-1 cursor-pointer"
            onClick={() => {
              setOrder && setOrder("Desc");
              handleTitle(title);
            }}
          >
            <img src={DownArrowIcon} alt="" />
            {/* <img src={DownArrowIconFaded} alt="*" /> */}
          </span>
        </div>
      )}
    </div>
  );
};

export default TableRowHeader;
