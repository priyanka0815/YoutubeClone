import React from 'react';

import { Search } from './index';
import {
  MenuIcon,
  YtLogo,
  BellIcon,
  VideoIcon,
} from '../../utils/Icons';

const Header = () => {
  return (
    <header>
      <div>
        <div className="yt_icon">
          <MenuIcon />
        </div>
        <div className="logo">
          <YtLogo />
        </div>
      </div>

      <Search />

      <div>
        <div className="yt_icon">
          <VideoIcon />
        </div>

        <div className="yt_icon">
          <BellIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;

// flow samjho

// header
//   first part
//     menu icon
//     yt icon

//   second part (Search Component)

//   third part
//     video icon
//     BellIcon
//     user account
