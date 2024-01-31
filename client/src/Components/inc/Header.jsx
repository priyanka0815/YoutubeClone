import React, { useState } from 'react';

import { Search, MenuBar, HeaderRight } from './index';
import { MenuIcon, YtLogo } from '../../utils/Icons';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header>
      <div>
        <div className="yt_icon" onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon />
        </div>

        <div className="logo">
          <YtLogo />
        </div>
      </div>

      <Search />

      <HeaderRight />

      <MenuBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
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
