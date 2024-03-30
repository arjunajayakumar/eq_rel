import Button from "@/components/Button";
import Input from "@/components/Input";
import CloseIcon from "../../../../assets/images/svg/close_icon.svg";

const ResendInvite = () => {
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
            Resend Invite 
          </h3>
          <div className="mt-4">
            <p className="text-sm font-medium text-greyBlackLightColor leading-normal">
            Confirming will resend the invite to the entered email ID
            </p>
          </div>
        </div>

<div className="mt-4">
  <Input name={""} label={'Confirm email id'} placeholder="will.smith@orgx.com" labelHide={true}></Input>
</div>
      </div>
      <div className=" pt-3 pb-6 flex px-6 w-full">
        <button
          type="button"
         
          className="inline-flex justify-center items-center rounded h-9 border border-greyLightColor text-sm font-medium text-interBlack w-1/2"
        >
          Cancel
        </button>
        <Button
                  text={'Send'}
                  type="submit"
                  isLoading={false}
                  className="inline-flex w-1/2 ml-3 h-9 border border-buttonLightGreen hover:bg-white hover:text-buttonLightGreen
                bg-buttonLightGreen justify-center items-center text-white text-sm rounded"
                />
      </div>
    </div>
  )
}

export default ResendInvite
