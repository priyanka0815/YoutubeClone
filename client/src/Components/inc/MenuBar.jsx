import React from 'react';
import { menuBar } from '../../utils/siteData';
import { NavLink, Link } from 'react-router-dom';
import { MenuIcon, YtLogo } from '../../utils/Icons';

const DisplayIconTitle = ({ icon, title }) => {
  return (
    <>
      {icon && <div className="icon">{icon}</div>}

      {title && <div className="title">{title}</div>}
    </>
  );
};

const MenuItem = (block) => {
  return (
    <li>
      <NavLink to={block.link} className="item" title={typeof block.title != 'object' && block.title}>
        <DisplayIconTitle {...block} />
      </NavLink>
    </li>
  );
};

const MenuBar = (props) => {
  return (
    <div id="menubar" className={props.openMenu ? 'active' : ''}>
      <div>
        <div className="bar-header">
          <div className="yt_icon" onClick={() => props.setOpenMenu(!props.openMenu)}>
            <MenuIcon />
          </div>

          <Link to="/">
            <div className="logo">
              <YtLogo />
            </div>
          </Link>
        </div>

        <ul className="menu">
          {menuBar.map((block, idx) => {
            if (block.isBlock) {
              return (
                <div className="block" key={idx}>
                  {block.title && (
                    <li key={idx} className="block-title">
                      {block.link ? (
                        <NavLink
                          to={block.link}
                          className="item"
                          title={typeof block.title != 'object' ? block.title : ''}
                        >
                          <DisplayIconTitle {...block} />
                        </NavLink>
                      ) : (
                        <div className="item">
                          <DisplayIconTitle {...block} />
                        </div>
                      )}
                    </li>
                  )}

                  {block.blockItems.map((blockItem, idx) => (
                    <MenuItem key={idx} {...blockItem} />
                  ))}
                </div>
              );
            }

            return <MenuItem key={idx} {...block} />;
          })}

          <div className="footer-text">
            <Link to="/about">About</Link>
            <Link to="/about/press">Press</Link>
            <Link to="/about/copyright">Copyright</Link>
            <Link to="/t/contact_us">Contact us</Link>
            <Link to="/creators">Creator</Link>
            <Link to="/ads">Advertise</Link>
            <Link to="https://developers.google.com/youtube">Developers</Link>
          </div>
          <div className="footer-text">
            <Link to="">Terms</Link>
            <Link to="">Privacy</Link>
            <Link to="">Policy & Safety</Link>
            <Link to="">How YouTube works</Link>
            <Link to="">Test new features</Link>
          </div>

          <div className="copyright">&copy; {new Date().getUTCFullYear()} Google LLC</div>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
