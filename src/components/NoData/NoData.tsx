import React from 'react'
import NoDataIcon from "../../assets/images/svg/no-data-search_icon.svg";
const NoData = () => {
  return (
      <div className="flex flex-col h-full items-center">
              <img className="mt-20" src={NoDataIcon} alt="" />
              <h2 className="text-interBlack text-xl font-medium py-2">
              No data found
              </h2>
              <span className="text-greyBlackColor text-sm font-medium text-center">
              There is no customers named <span className='font-semibold'>“Will Smith”</span>  <br /> Please try again
              </span>
            </div>
  )
}

export default NoData
