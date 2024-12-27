import React from "react";
import { SignInUserIcon } from "../../utils/Icons";
import { useYtContext } from "../../utils/YTContext";
import { openConsentScreen } from "../../utils/functions";

const AccountHandler = (props = { allowSigninText: true }) => {
  const [ytContextData] = useYtContext();
  const userInfo = ytContextData?.userInfo;

  return (
    <div className={`account ${props.allowSigninText ? "show-signin-text" : ""}`}>
      {userInfo ? (
        <img src={userInfo.picture} />
      ) : (
        <div className="signin-button" onClick={openConsentScreen}>
          <div className="yt-icon no-hover">
            <SignInUserIcon />
          </div>

          {props.allowSigninText && <div>Sign in</div>}
        </div>
      )}
    </div>
  );
};

export default AccountHandler;
