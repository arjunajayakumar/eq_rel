import CloseIcon from "../../../../assets/images/svg/close_icon.svg";

const RemoveUser = () => {
  return (
    <div className="relative transform overflow-hidden bg-white rounded-lg shadow-xl transition-all sm:my-8 w-[348px] font-Inter">
      <div className=" p-6 ">
        <div className="mt-3 text-left">
          <img
            src={CloseIcon}
            alt="*"
            className="cursor-pointer absolute right-5 top-8"
            
          />
          <h3 className="text-xl font-semibold leading-6 text-blackDarkColor" id="modal-title">
            Remove User
          </h3>
          <div className="mt-4">
            <p className="text-sm font-medium text-greyBlackLightColor leading-normal">
            User will be removed from the organization and the invite link will be no longer valid
            </p>
          </div>
        </div>
      </div>
      <div className=" pt-3 pb-6 flex px-6 w-full">
        <button
          type="button"
         
          className="inline-flex justify-center items-center rounded h-9 border border-greyLightColor text-sm font-medium text-interBlack w-1/2"
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex justify-center items-center h-9 rounded bg-redButtonColor text-sm font-medium text-white ml-3 w-1/2 hover:opacity-50"
        >
          Remove User
        </button>
      </div>
    </div>
  )
}

export default RemoveUser
