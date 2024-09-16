import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { addToggle, constructQueryFromObj, convertToInternationalNumber, fetchSubscribe } from "../../utils/functions";
import { SearchIcon } from "../../utils/Icons";
import { API } from "../../utils/api";
import { useYtContext } from "../../utils/YTContext";

const ChannelDashboard = () => {
  const [ytContextData] = useYtContext();
  const [channelHandle, setChannelHandle] = useState("");
  const [channelId, setChannelId] = useState("");
  const [channelDetails, setChannelDetails] = useState({});

  const param = useParams();
  useEffect(() => {
    if (param.handle) setChannelHandle(param.handle);
    if (param.channelId) setChannelId(param.channelId);
  }, [param.channelId, param.handle]);

  useEffect(() => {
    const getChannelDetail = async () => {
      const channelInfo = {};
      if (channelHandle) channelInfo.forHandle = channelHandle;
      else channelInfo.id = channelId;

      const data = await API.getChannelDetails(
        constructQueryFromObj({
          part: "snippet,contentDetails,statistics,status,brandingSettings,contentOwnerDetails",
          ...channelInfo,
        })
      );

      if (!data.isError && data.items.length > 0) {
        const detail = data.items[0];
        setChannelDetails(detail);
        setChannelId(detail.id);
        setChannelHandle(detail.snippet.customUrl);
      }
    };

    if (channelHandle || channelId) getChannelDetail();

    let onlineFunc;
    window.addEventListener(
      "online",
      (onlineFunc = function () {
        console.log("Online");
        if ((channelHandle || channelId) && channelDetails == {}) {
          getChannelDetail();
        }
      })
    );

    return () => {
      window.removeEventListener("online", onlineFunc);
    };
  }, [channelHandle, channelId]);

  useEffect(() => {
    async function fetchSubscribes() {
      const data = await fetchSubscribe(ytContextData, channelDetails.id);

      if (data && !data.isError) {
        if (data.items.length > 0) {
          // subscribed to channel
          console.log("Subscribed");
          setChannelDetails((prevChannelDetails) => ({
            ...prevChannelDetails,
            isSubscribed: true,
            subscriptionId: data.items[0].id,
          }));
        }
      }
    }

    if (channelDetails.id) {
      fetchSubscribes();
    }
  }, [channelDetails.id]);

  const channelNavs = [
    {
      url: "",
      text: "home",
    },
    {
      url: "videos",
      text: "Videos",
    },
    {
      url: "shorts",
      text: "Shorts",
    },
    {
      url: "live",
      text: "Live",
    },
    {
      url: "playlist",
      text: "Playlist",
    },
    {
      url: "community",
      text: "Community",
    },
  ];

  return (
    <div id="channel" className="fix-scroll">
      <div id="channel_header">
        <div className="container">
          {channelDetails.brandingSettings?.image?.bannerExternalUrl && (
            <div id="cover_img">
              <img src={`${channelDetails.brandingSettings?.image?.bannerExternalUrl}=w1707`} alt="" />
            </div>
          )}

          <div id="channel_details">
            <div id="channel_logo">
              <img
                src={`${channelDetails.snippet?.thumbnails.medium.url}`}
                alt={`${channelDetails.snippet?.title}\'s Avatar`}
              />
            </div>

            <div id="channel_info">
              <h1>{channelDetails.snippet?.title}</h1>
              <div>
                <span>{channelDetails.snippet?.customUrl}</span>
                <span>
                  {convertToInternationalNumber(
                    channelDetails.statistics?.subscriberCount,
                    "subscriber",
                    "subscribers"
                  )}
                </span>
                <span>{channelDetails.statistics?.videoCount} videos</span>
              </div>

              <div id="video_detail" className="more-detail">
                <span className="text-ellipsis">{channelDetails.snippet?.description}</span>

                <span className="info">...More</span>
              </div>

              {/* <div id="links" className="more-detail">
                <Link to="#">in.portal-pokemon.com</Link>
                <span className="info">and 1 more link</span>
              </div> */}

              <div className="subscribe">
                {channelDetails.isSubscribed ? (
                  <button className="unsubscribe">Subscribed</button>
                ) : (
                  <button className="subscribe">Subscribe</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="channel_nav">
        <nav className="container">
          {channelNavs.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={channelHandle ? `/${channelHandle}/${link.url}` : `/channel/${channelId}/${link.url}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
          <li>
            <SearchIcon />
          </li>
        </nav>
      </div>

      <div className="container" id="channel_section_data">
        <Outlet context={[channelDetails, setChannelDetails]} />
      </div>
    </div>
  );
};

export default ChannelDashboard;
