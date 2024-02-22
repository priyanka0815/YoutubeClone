import React, { useState } from 'react';

import { Search, MenuBar, HeaderRight } from './index';
import { MenuIcon, YtLogo } from '../../utils/Icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header>
      <div>
        <div className="yt_icon" onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon />
        </div>

        <Link to="/">
          <div className="logo">
            <YtLogo />
          </div>
        </Link>
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
