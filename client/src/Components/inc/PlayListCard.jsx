import React from "react";
import { PlayListIcon } from "../../utils/Icons";
import { convertToInternationalNumber } from "../../utils/functions";
import { Link } from "react-router-dom";

const PlayListCard = (props) => {
  return (
    <div className="playlist-card">
      <Link to={`/playlist?list=${props.id}`}>
        <div className="thumbnail">
          <img src={props.snippet?.thumbnails?.medium.url} alt={`${props.snippet?.title}\'s Playlist`} />

          <div className="count">
            <div className="yt-icon">
              <PlayListIcon />
            </div>

            <span>{convertToInternationalNumber(props.contentDetails?.itemCount || 0, "video", "videos")}</span>
          </div>
        </div>
      </Link>

      <div className="info">
        <Link to={`/playlist?list=${props.id}`}>
          <h4 className="text-ellipsis">{props.snippet?.title}</h4>
        </Link>

        <Link to={`/playlist?list=${props.id}`}>
          <span className="open-playlist">View Full Playlist</span>
        </Link>
      </div>
    </div>
  );
};

export default PlayListCard;
