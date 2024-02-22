import React, { useEffect } from 'react';
import { sideBarLinks } from '../../utils/siteData';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    const hidingPageUrls = ['/watch'];
    const sideBar = document.querySelector('#side_menu_bar');

    if (hidingPageUrls.indexOf(location.pathname) > -1) {
      sideBar.style.setProperty('display', 'none');
    } else {
      sideBar.style.setProperty('display', 'block');
    }
  }, [location.pathname]);

  return (
    <aside id="side_menu_bar">
      {sideBarLinks.map((block, idx) => (
        <Link to={block.link} key={idx} title={block.title}>
          <div className="sidebar-links">
            <div className="yt_icon">{block.icon}</div>

            <div className="title">{block.title}</div>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
