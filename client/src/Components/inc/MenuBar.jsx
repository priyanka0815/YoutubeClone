import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { MenuIcon, YtLogo } from "../../utils/Icons";
import { useYtContext } from "../../utils/YTContext";

// Display individual Menu Item
const DisplayIconTitle = ({ icon, title }) => {
  return (
    <>
      {icon && <div className="icon">{icon}</div>}

      {title && <div className="title">{title}</div>}

      {props.haveUpdate && <div className="new-notification" />}
    </>
  );
};

// container of menu Item
const MenuItem = (linkItem) => {
  return (
    <li>
      <NavLink to={linkItem.link} className="item" title={typeof linkItem.title != "object" && linkItem.title}>
        <DisplayIconTitle {...linkItem} />
      </NavLink>
    </li>
  );
};

// constructing block
const ConstructSectionBlock = (sectionBlockData) => {
  const [maxItem, setMaxItem] = useState(sectionBlockData.blockInfo?.maxItems || Infinity);

  return (
    <>
      {sectionBlockData.blockItems.slice(0, maxItem).map((item, idx) => (
        <MenuItem key={idx} {...item} />
      ))}

      {/* display only if block have total item more than maxItems */}
      {sectionBlockData.blockInfo && sectionBlockData.blockItems.length > sectionBlockData.blockInfo?.maxItems && (
        <li>
          {sectionBlockData.blockItems.length > maxItem ? (
            <div className="item link" onClick={() => setMaxItem(Infinity)}>
              <DisplayIconTitle {...sectionBlockData.blockInfo.expand} />
            </div>
          ) : (
            <div className="item link" onClick={() => setMaxItem(sectionBlockData.blockInfo?.maxItems || Infinity)}>
              <DisplayIconTitle {...sectionBlockData.blockInfo.collapse} />
            </div>
          )}
        </li>
      )}
    </>
  );
};

const MenuBar = (props) => {
  const [YtContext] = useYtContext();

  return (
    <div id="menubar" className={props.openMenu ? "active" : ""}>
      <div>
        <div className="bar-header">
          <div className="yt-icon" onClick={() => props.setOpenMenu(!props.openMenu)}>
            <MenuIcon />
          </div>

          <Link to="/">
            <div className="logo">
              <YtLogo />
            </div>
          </Link>
        </div>

        <ul className="menu">
          {YtContext.siteBarData?.map((block, idx) => {
            if (block.isBlock) {
              // displaying a section

              return (
                <div className="block" key={idx}>
                  {block.title && (
                    // Displaying Block Title
                    <li key={idx} className="block-title">
                      {block.link ? (
                        <NavLink
                          to={block.link}
                          className="item"
                          title={typeof block.title != "object" ? block.title : ""}
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

                  <ConstructSectionBlock {...block} />
                </div>
              );
            }

            return <MenuItem key={idx} {...block} />;
          })}

          <div className="footer-text">
            <Link to="https://www.youtube.com/about/">About</Link>
            <Link to="https://www.youtube.com/about/press/">Press</Link>
            <Link to="https://www.youtube.com/about/copyright/">Copyright</Link>
            <Link to="https://www.youtube.com/t/contact_us/">Contact us</Link>
            <Link to="https://www.youtube.com/creators/">Creator</Link>
            <Link to="https://www.youtube.com/ads/">Advertise</Link>
            <Link to="https://developers.google.com/youtube">Developers</Link>
          </div>
          <div className="footer-text">
            <Link to="https://www.youtube.com/t/terms">Terms</Link>
            <Link to="https://www.youtube.com/t/privacy">Privacy</Link>
            <Link to="https://www.youtube.com/about/policies/">Policy & Safety</Link>
            <Link to="https://www.youtube.com/howyoutubeworks">How YouTube works</Link>
            <Link to="https://www.youtube.com/new">Test new features</Link>
          </div>

          <div className="copyright">&copy; {new Date().getUTCFullYear()} Google LLC</div>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
