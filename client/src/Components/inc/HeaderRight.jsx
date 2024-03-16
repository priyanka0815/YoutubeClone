import React from 'react';
import { BellIcon, SignInMenuIcon, VideoIcon } from '../../utils/Icons';
import AccountHandler from './AccountHandler';

const HeaderRight = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) ?? null;

  return (
    <div>
      {userInfo ? (
        <>
          <div className="yt-icon">
            <VideoIcon />
          </div>

          <div className="yt-icon">
            <BellIcon />
          </div>
        </>
      ) : (
        <div className="yt-icon">
          <SignInMenuIcon />
        </div>
      )}

      <AccountHandler allowSigninText={true} />
    </div>
  );
};

export default HeaderRight;
