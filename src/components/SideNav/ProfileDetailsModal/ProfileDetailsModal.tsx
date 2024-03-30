import { useState } from "react";
import EditIcon from "../../../assets/images/svg/edit_black_icon.svg";
import LockIcon from "../../../assets/images/svg/lock_icon.svg";

import Modal from "react-modal";
import ChangePassword from "../ChangePassword/ChangePassword";

const ProfileDetailsModel = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const changePasswordModel = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="relative transform overflow-hidden bg-white rounded-lg shadow-xl transition-all sm:my-8 h-[344px] w-[331px] font-Inter">
      <div className="h-[108px] bg-[#E8F8F1] rounded-t-lg flex flex-col justify-between px-6 pt-10 pb-6">
        <div className="flex items-center w-full">
          <div className="flex justify-center items-center bg-interBlack w-14 h-12 rounded border border-greenLightColor">
            <span className="uppercase text-xl font-semibold text-white">ws</span>
          </div>
          <div className="flex justify-between items-end h-full w-full">
            <span className="text-lg font-semibold pl-2 text-interBlack capitalize">Will Smith</span>

            <button className="flex justify-center items-center w-30 h-30 rounded font-semibold text-white bg-white edit-icon-bg">
              <img src={EditIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className=" pt-4 pb-6 flex px-6 w-full">
        <div className="flex flex-col w-full">
          <span className="text-base font-semibold text-greyBlackColor">Profile Details</span>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-2">
            <div className="w-1/2">
              <span>Phone</span>
            </div>
            <div className="w-1/2">
              <span className="text-greyBlackColor">+1 (206) 555-1234</span>
            </div>
          </div>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-3">
            <div className="w-1/2">
              <span>Email</span>
            </div>
            <div className="w-1/2">
              <span className="text-greyBlackColor">John.Doe@organizationx</span>
            </div>
          </div>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-3">
            <div className="w-1/2">
              <span>NMLS</span>
            </div>
            <div className="w-1/2">
              <span className="text-greyBlackColor">1234</span>
            </div>
          </div>
          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-3 pb-4 border-b border-sideNavButtonBg">
            <div className="w-1/2">
              <span>Role</span>
            </div>
            <div className="w-1/2">
              <span className="text-greyBlackColor capitalize">Loan Officer</span>
            </div>
          </div>

          <div className="flex w-full text-xs font-medium text-greyBlackLightColor pt-4">
            <div className="flex items-center cursor-pointer" onClick={changePasswordModel}>
              <span>
                <img src={LockIcon} alt="" />
              </span>
              <span className="text-greenLightColor capitalize pl-1">Change password</span>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="mx-auto rounded-lg shadow-modal"
        style={{
          overlay: {
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.61)",
          },
        }}
      >
        <ChangePassword setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default ProfileDetailsModel;
