import React from 'react';
import './watch.css';
import Playlist from './Playlist';
import { Link } from 'react-router-dom';
import { convertToInternationalNumber } from '../../utils/functions';
import {
  DislikeOutlinedIcon,
  DotsMenuIcon,
  LikeOutlinedIcon,
  ShareOutlinedIcon,
  VerifiedIcon,
} from '../../utils/Icons';

const index = () => {
  const props = {
    channelHandle: 'zeeTv',
    channelName: 'Zee TV',
    isVerified: true,
  };
  return (
    <div id="watch_page">
      <div id="watch_video">
        <iframe
          width="1280px"
          height="720px"
          src="https://www.youtube.com/embed/kWzm1qBjOQQ?autoplay=1&controls=0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <Playlist />

      <div id="watch_video_detail">
        <h1 id="video_title">Ep. 314 | Rasika जा रही है घर छोड़कर | Pavitra Rishta | Zee TV</h1>

        <div id="extra">
          <div id="channel_info">
            <div className="channel_logo">
              <Link to={`/@${props.channelHandle}`}>
                <img src={`/images/channels/ZeeTv.jpg`} alt="channel Logo" />
              </Link>
            </div>

            <div className="channel-detail">
              <div className="channel-name">
                <h4>
                  <Link to={`/@${props.channelHandle}`}>{props.channelName}</Link>
                </h4>

                {props.isVerified && (
                  <span className="verify">
                    <VerifiedIcon />
                  </span>
                )}
              </div>

              <span className="total-subscriber">{convertToInternationalNumber(3294820414)} subscribers</span>
            </div>

            <div className="subscribe">
              <button>Subscribe</button>
            </div>
          </div>

          <div id="video_actions">
            <div className="btn-group">
              <div className="btn">
                <div className="icon">
                  <LikeOutlinedIcon />
                </div>
                <div className="text">{convertToInternationalNumber(398321)}</div>
              </div>
              <div className="btn">
                <div className="icon">
                  <DislikeOutlinedIcon />
                </div>
              </div>
            </div>

            <div className="btn">
              <div className="icon">
                <ShareOutlinedIcon />
              </div>
              <div className="text">Share</div>
            </div>

            <div className="btn">
              <div className="icon">
                <DotsMenuIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
