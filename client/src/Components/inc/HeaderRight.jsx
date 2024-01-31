import React from 'react';
import { BellIcon, SignInMenuIcon, VideoIcon } from '../../utils/Icons';
import AccountHandler from './AccountHandler';

const HeaderRight = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) ?? null;

  return (
    <div>
      {userInfo ? (
        <>
          <div className="yt_icon">
            <VideoIcon />
          </div>

          <div className="yt_icon">
            <BellIcon />
          </div>
        </>
      ) : (
        <div className="yt_icon">
          <SignInMenuIcon />
        </div>
      )}

      <AccountHandler />
    </div>
  );
};

export default HeaderRight;
