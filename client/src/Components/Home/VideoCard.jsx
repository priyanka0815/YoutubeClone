import React from 'react';
import { Link } from 'react-router-dom';
import { VerifiedIcon } from '../../utils/Icons';
import {
  calculateAge,
  convertToInternationalNumber,
  parseDuration,
} from '../../utils/functions';

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
            {parseDuration(props.duration)}
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
            <span className="channel-name">
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
            <span>
              {convertToInternationalNumber(
                props.totalViews
              )}{' '}
              views
            </span>
            <span>•</span>
            <span>
              {calculateAge(props.uploadTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
