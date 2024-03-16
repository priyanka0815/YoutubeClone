import React from 'react';
import './watch.css';
import Playlist from './Playlist';
import { Link } from 'react-router-dom';
import { addToggle, calculateAge, convertToInternationalNumber } from '../../utils/functions';
import {
  DislikeOutlinedIcon,
  DotsMenuIcon,
  LikeOutlinedIcon,
  ShareOutlinedIcon,
  VerifiedIcon,
} from '../../utils/Icons';
import Comment from './Comment';

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

          <div id="video_actions" className="btn-container">
            <div className="btn-group">
              <div className="btn-icon">
                <div className="icon">
                  <LikeOutlinedIcon />
                </div>
                <div className="text">{convertToInternationalNumber(398321)}</div>
              </div>

              <div className="btn-icon">
                <div className="icon">
                  <DislikeOutlinedIcon />
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
              title={`${convertToInternationalNumber(834479)} views Streamed ${calculateAge(1545646554)} #jsajdl`}
            >
              {`${convertToInternationalNumber(834479)} views`} {`Streamed ${calculateAge(1545646554)} `}
              <a href="#">#jsajdl</a>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, officia, reprehenderit id corporis
              perferendis, pariatur architecto officiis laboriosam facilis accusamus animi! Iure dolores nam dolorem.
              Voluptate culpa magnam quisquam voluptatem cum ea veniam soluta. Quos sed porro placeat quam recusandae
              hic aliquid in assumenda eum? Aspernatur et iste praesentium voluptatum?
            </p>
          </div>

          <p className="toggle-btn" onClick={(e) => addToggle(e, '#video_detail', ['More', 'Show Less'])}>
            More
          </p>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default index;
