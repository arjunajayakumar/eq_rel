import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";
import { auth } from "@/lib/firebase";

import { ORGANIZATION_REGISTRATION } from "@/src/routes/routesConstants";
import { VALIDATE_USER_ERRORS } from "@/lib/errorCodes";

import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";

import { CheckValidateUserService } from "../../service/auth.service";

import Logo from "@/src/equity_release_logo.svg";

const ValidateUser = (): JSX.Element => {
  const [urlParams] = useSearchParams();
  const invitationKey = urlParams.get("invitation_key");
  const navigate = useNavigate();

  const [isValidated, setIsValidated] = useState<boolean>(true);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  // Handle logout functionality whilst also clearing AuthMeData state
  const handleLogout = async (): Promise<void> => {
    await auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleValidation = async (invitation_key: string) => {
    const body = {
      verification_token: invitation_key,
    };
    try {
      const response = await CheckValidateUserService(body);
      handleLogout();
      if (response) {
        navigate(
          { pathname: ORGANIZATION_REGISTRATION },
          {
            state: {
              validateUserDetails: { first_name: response?.user_profile.first_name, email: response?.email, invitation_key },
            },
          }
        );
      }
    } catch (err) {
      setIsValidated(false);
      const error = (err as AxiosError)?.message.toLocaleLowerCase().trim();
      setDisplayMessage(VALIDATE_USER_ERRORS.filter((item) => item.errorMessage === error)[0].displayMessage);
    }
  };

  useEffect(() => {
    if (invitationKey) {
      handleValidation(invitationKey);
    }
  }, [invitationKey]);

  return (
    <>
      {!isValidated ? (
        <div className="m-auto w-[367px] h-[443px] shadow-card px-4 pt-8 pb-4 flex flex-col items-center rounded-lg font-Inter bg-white">
          <img className="w-9 h-9" src={Logo} alt="*" />
          <h1 className="text-xl text-blackDarkColor font-semibold pt-28">This invite link is no longer active!</h1>

          <small className="text-xs font-medium text-greyBlackLightColor mt-3 text-center leading-4">{displayMessage}</small>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center m-auto">
          <div className="w-20">
            <div>
              <LoaderSpinner />
            </div>
            <div>
              <h1 className="text-xl text-blackDarkColor font-semibold pt-28">Checking validation</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ValidateUser;
