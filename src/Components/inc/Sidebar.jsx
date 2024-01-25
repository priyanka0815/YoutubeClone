import React from 'react';
import { sideBarLinks } from '../../utils/siteData';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      {sideBarLinks.map((block, idx) => (
        <Link to={block.link} key={idx}>
          <div className="sidebar-links">
            <div className="yt_icon">
              {block.icon}
            </div>

            <div className="title">
              {block.title}
            </div>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
