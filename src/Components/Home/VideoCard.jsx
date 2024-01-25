import React from 'react';
import { Link } from 'react-router-dom';
import { VerifiedIcon } from '../../utils/Icons';

const VideoCard = (props) => {
  return (
    <div className="videocard">
      <div className="thumbnail">
        <Link to={`/watch?v=${props.videoId}`}>
          <img
            src={`/images/thumbnails/${props.thumbnail}`}
            alt={props.videoTitle}
          />
          <span className="duration">
            {props.duration}
          </span>
        </Link>
      </div>
      <div className="info">
        <div className="channel-logo">
          <Link to={`/@${props.channelHandle}`}>
            <img
              src={`/images/channels/${props.channelLogo}`}
              alt={props.channelName}
            />
          </Link>
        </div>
        <div className="video-info">
          <h4>
            <Link
              to={`/watch?v=${props.videoId}`}
            >
              {props.videoTitle}
            </Link>
          </h4>
          <div className="channel-info">
            <span>
              <Link
                to={`/@${props.channelHandle}`}
              >
                {props.channelName}
              </Link>
            </span>
            {props.isVerified && (
              <span className="verify">
                <VerifiedIcon />
              </span>
            )}
          </div>

          <div className="extra-info">
            <span>{props.totalViews} views</span>
            <span>•</span>
            <span>{props.uploadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
