import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VerifiedIcon } from "../../utils/Icons";
import { calculateAge, convertToInternationalNumber, parseDuration } from "../../utils/functions";
import { API } from "../../utils/api";

const VideoCard = ({ video, ...props }) => {
  const [channelDetail, setChannelDetail] = useState({});

  useEffect(() => {
    const channelInfo = async () => {
      const response = await API.getChannelDetails(`part=snippet&id=${video.snippet.channelId}`);

      if (response.isError || response.items.length == 0) {
        throw new Error("Error While getting channel detail");
      }

      setChannelDetail(response.items[0].snippet);
      console.log(response.items[0].snippet);
    };

    if (props.loadChannelInfo && !props.isLogoAllowed && video.snippet?.channelId) {
      channelInfo();
    }
  }, [video.snippet?.channelId]);

  useEffect(() => {
    if (props.channel) setChannelDetail(props.channel);
  }, [props.channel]);

  if (video?.channel && !video?.channel?.channelId) return <></>;

  return (
    <div className={`videocard ${props.isPlaylistItem ? "playlist-item" : ""}`}>
      <Link to={`/watch?v=${video.id}`}>
        <div className="thumbnail">
          <img src={`${video.snippet?.thumbnails.medium.url}`} alt={video.snippet?.title} />

          {video.contentDetails?.duration && (
            <span className="duration">{parseDuration(video.contentDetails?.duration)}</span>
          )}
        </div>
      </Link>

      <div className="info">
        {(props.isLogoAllowed == undefined || props.isLogoAllowed) && (
          <div className="channel-logo">
            <Link to={`/${channelDetail.customUrl}`}>
              <img
                src={`${channelDetail.thumbnails?.default.url}`}
                alt={channelDetail.title ?? video.snippet?.channelTitle}
              />
            </Link>
          </div>
        )}

        <div className="video-info">
          <Link to={`/watch?v=${video.id}`}>
            <h4 className="text-ellipsis">{video.snippet?.title}</h4>
          </Link>

          {(props.isChannelNameAllowed == undefined || props.isChannelNameAllowed) && (
            <div className="channel-info text-ellipsis">
              <Link
                to={
                  channelDetail.customUrl
                    ? `/${channelDetail.customUrl}`
                    : `/channel/${channelDetail.channelId ?? video.snippet?.channelId}`
                }
              >
                <span className="channel-name">{channelDetail.title ?? video.snippet?.channelTitle}</span>
                {props.isVerified && (
                  <span className="verify">
                    <VerifiedIcon />
                  </span>
                )}
              </Link>
            </div>
          )}

          <Link to={`/watch?v=${video.id}`}>
            <div className="video-info">
              <div className="extra-info text-ellipsis">
                {video.statistics?.viewCount && (
                  <>
                    <span>{convertToInternationalNumber(video.statistics?.viewCount)} views</span>
                    <span>•</span>{" "}
                  </>
                )}
                <span>{calculateAge(video.snippet?.publishedAt)}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
