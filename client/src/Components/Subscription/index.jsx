import React from "react";
import "./style.css";
import { SubscriptionOutlineIcon } from "../../utils/Icons";
import { AccountHandler } from "../inc";
import { useYtContext } from "../../utils/YTContext";
import SubscriptionHome from "./SubscriptionHome";

const Subscriptions = () => {
  const [ytContextData] = useYtContext();

  return (
    <div id="subscription_page">
      {ytContextData.googleAuth ? (
        <SubscriptionHome />
      ) : (
        <div id="logged_out">
          <div>
            <div className="yt_icon">
              <SubscriptionOutlineIcon />
            </div>

            <div className="details">
              <h2>Don&apos;t miss new videos</h2>
              <p>Sign in to see updates from your favorite YouTube channels</p>

              <AccountHandler allowSigninText />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
