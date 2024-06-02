import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { addToggle, constructQueryFromObj, convertToInternationalNumber } from "../../utils/functions";
import { SearchIcon } from "../../utils/Icons";
import { API } from "../../utils/api";
import { useYtContext } from "../../utils/YTContext";

const Channel = () => {
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
      else channelInfo.channelId = channelId;

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
  }, [channelHandle, channelId]);

  useEffect(() => {
    async function fetchSubscribe() {
      if (!ytContextData.googleAuth) return;

      const data = await API.getSubscription({
        body: constructQueryFromObj({ mine: true, forChannelId: channelDetails.id }),
        authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
      });

      if (!data.isError) {
        if (data.items.length > 0) {
          // subscribed to channel
          setInfo((prevInfo) => ({
            ...prevInfo,
            isSubscribed: true,
            subscriptionId: data.items[0].id,
          }));
        }
      }
    }

    if (channelDetails.id) {
      fetchSubscribe();
    }
  }, [channelDetails]);

  const channelNavs = [
    {
      url: "home",
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
    <div id="channel">
      <div id="channel_header">
        <div className="container">
          <div id="cover_img">
            <img src={channelDetails.brandingSettings?.image.bannerExternalUrl} alt="" />
          </div>

          <div id="channel_details">
            <div id="channel_logo">
              <img
                src={channelDetails.snippet?.thumbnails.medium.url}
                alt={`${channelDetails.snippet?.title}&apos;s Avatar`}
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
                <button id="subscribe_btn">Subscribe</button>
              </div>
            </div>
          </div>

          <nav id="channel_nav">
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
      </div>

      <div className="container">
        <Outlet context={[channelDetails, setChannelDetails]} />
      </div>
    </div>
  );
};

export default Channel;
