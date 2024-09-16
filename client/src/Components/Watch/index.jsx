import React, { Suspense, useEffect, useState } from "react";
import { API } from "../../utils/api";
import "./watch.css";
import Playlist from "./Playlist";
import { Link, useSearchParams } from "react-router-dom";
import {
  addSubscription,
  addToggle,
  calculateAge,
  constructQueryFromObj,
  convertToInternationalNumber,
  fetchSubscribe,
  formatVideoDescription,
  removeSubscription,
} from "../../utils/functions";
import {
  DislikeFilledIcon,
  DislikeOutlinedIcon,
  DotsMenuIcon,
  LikeFilledIcon,
  LikeOutlinedIcon,
  ShareOutlinedIcon,
  VerifiedIcon,
} from "../../utils/Icons";
import Comment from "./Comment";
import { Loading } from "../inc";
import { useYtContext } from "../../utils/YTContext";

const index = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [info, setInfo] = useState({});
  const [ytContextData] = useYtContext();

  const processInfo = (prevInfo, data, key) => {
    return {
      ...prevInfo,
      videoId: searchParam.get("v"),
      [key]: {
        ...data.snippet,
        statistics: data.statistics,
      },
    };
  };

  const addRating = async (e, rating) => {
    const initial = rating;
    if (!info?.videoId) return;

    if (rating == info?.rating) rating = "none";

    const data = await API.addVideoRating({
      body: { id: info?.videoId, rating: rating },
      authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
    });

    if (!data.isError) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        videoInfo: {
          ...prevInfo.videoInfo,
          statistics: {
            ...prevInfo.videoInfo.statistics,
            likeCount:
              +prevInfo.videoInfo.statistics.likeCount +
              (initial == "like" ? (rating == "none" ? -1 : 1) : rating == "dislike" && info.rating == "like" ? -1 : 0),
          },
        },
        rating: rating,
      }));
    }
  };

  const addSubscribe = async (e) => {
    const data = await addSubscription(ytContextData, info?.videoInfo?.channelId);

    if (!data.isError) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        isSubscribed: true,
        subscriptionId: data.id,
      }));
    }
  };

  const removeSubscribe = async (e) => {
    const data = await removeSubscription(ytContextData, info.subscriptionId);

    if (!data.isError) {
      setInfo((prevInfo) => ({
        ...prevInfo,
        isSubscribed: false,
        subscriptionId: null,
      }));
    }
  };

  useEffect(() => {
    async function fetchVideo() {
      const data = await API.getVideoDetails(`part=snippet,statistics&id=${searchParam.get("v")}`);

      if (!data.isError && data.items.length > 0) {
        setInfo((prevInfo) => processInfo(prevInfo, data?.items[0], "videoInfo"));
      }
    }

    fetchVideo();
  }, [searchParam.get("v")]);

  useEffect(() => {
    async function fetchChannel() {
      const data = await API.getChannelDetails(`part=snippet,statistics&id=${info?.videoInfo?.channelId}`);

      if (!data.isError && data.items.length > 0) {
        setInfo((prevInfo) => processInfo(prevInfo, data?.items[0], "channelInfo"));
      }
    }

    async function fetchRating() {
      if (!ytContextData.googleAuth) return;

      const data = await API.getVideoRatings({
        body: `id=${info?.videoId}`,
        authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
      });

      if (!data.isError && data.items.length > 0) {
        setInfo((prevInfo) => ({
          ...prevInfo,
          rating: data.items[0].rating,
        }));
      }
    }

    async function fetchSubscribes() {
      const data = await fetchSubscribe(ytContextData, info?.videoInfo?.channelId);

      if (data && !data.isError) {
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

    if (info?.videoId) {
      fetchChannel();
      fetchRating();
      fetchSubscribes();
    }
  }, [info?.videoInfo?.channelId]);

  return (
    <div id="watch_page" className="fix-scroll">
      <div id="watch_video">
        <iframe
          width="1280px"
          height="720px"
          src={`https://www.youtube.com/embed/${info?.videoId ?? ""}`}
          title={info?.videoInfo?.title ?? "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <Playlist />

      <div id="watch_video_detail">
        <h1 id="video_title">{info?.videoInfo?.title || "{{ VIDEO TITLE }}"}</h1>

        <div id="extra">
          <div id="channel_info">
            <div className="channel_logo">
              <Link to={`/${info?.channelInfo?.customUrl}`}>
                <img src={info?.channelInfo?.thumbnails?.default.url} alt={`${info?.channelInfo?.customUrl} Logo`} />
              </Link>
            </div>

            <div className="channel-detail">
              <div className="channel-name">
                <h4>
                  <Link to={`/${info?.channelInfo?.customUrl}`}>
                    {info?.channelInfo?.title ?? "{{ CHANNEL NAME }}"}
                  </Link>
                </h4>

                {info?.channelInfo?.isVerified && (
                  <span className="verify">
                    <VerifiedIcon />
                  </span>
                )}
              </div>

              <span className="total-subscriber">
                {convertToInternationalNumber(
                  info?.channelInfo?.statistics?.subscriberCount,
                  "subscriber",
                  "subscribers"
                )}
              </span>
            </div>

            <div className="subscribe">
              {info?.isSubscribed ? (
                <button className="unsubscribe" onClick={removeSubscribe}>
                  Unsubscribe
                </button>
              ) : (
                <button className="subscribe" onClick={addSubscribe}>
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div id="video_actions" className="btn-container">
            <div className="btn-group">
              <div className="btn-icon" onClick={(e) => addRating(e, "like")}>
                <div className={`icon`}>{info?.rating != "like" ? <LikeOutlinedIcon /> : <LikeFilledIcon />}</div>
                <div className="text">{convertToInternationalNumber(info?.videoInfo?.statistics.likeCount ?? 0)}</div>
              </div>

              <div className="btn-icon" onClick={(e) => addRating(e, "dislike")}>
                <div className={`icon`}>
                  {info?.rating != "dislike" ? <DislikeOutlinedIcon /> : <DislikeFilledIcon />}
                </div>
              </div>
            </div>

            <div className="btn-icon">
              <div className="icon">
                <ShareOutlinedIcon />
              </div>
              <div className="text">Share</div>
            </div>

            <div className="btn-icon">
              <div className="icon">
                <DotsMenuIcon />
              </div>
            </div>
          </div>
        </div>

        <div id="video_detail">
          <div className="text-ellipsis" id="toggle_window">
            <p
              className="bold"
              title={`${convertToInternationalNumber(info?.videoInfo?.statistics.viewCount ?? 0, "view", "views")} ${
                info?.videoInfo?.liveBroadcastContent == "live" ? "Streamed" : ""
              } ${calculateAge(info?.videoInfo?.publishedAt)} #jsajdl`}
            >
              {`${convertToInternationalNumber(info?.videoInfo?.statistics.viewCount ?? 0, "view", "views")} `}
              {info?.videoInfo?.liveBroadcastContent == "live" && "Streamed "}
              {`${calculateAge(info?.videoInfo?.publishedAt)} `}
            </p>
            <p dangerouslySetInnerHTML={{ __html: formatVideoDescription(info?.videoInfo?.description) }}></p>
          </div>

          <p className="toggle-btn" onClick={(e) => addToggle(e, "#video_detail", ["More", "Show Less"])}>
            More
          </p>
        </div>
      </div>

      <Comment videoId={info?.videoId} commentCount={info?.videoInfo?.statistics?.commentCount} />
    </div>
  );
};

export default index;
