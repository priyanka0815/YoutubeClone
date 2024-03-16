import React, { Suspense, useState } from 'react';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import { calculateAge, convertToInternationalNumber } from '../../utils/functions';
import { CaretDown, CaretUp, DislikeOutlinedIcon, LikeOutlinedIcon } from '../../utils/Icons';
import { Loading } from '../inc';

const UserComment = (props) => {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [toggleReplies, setToggleReplies] = useState(false);

  return (
    <div className="comment">
      <div className="user-img">
        <Link to={`/@${props?.channel.handle}`}>
          <img src={props.channel.thumbnail} alt={`${props.channel.name}&apos; Logo`} />
        </Link>
      </div>

      <div className="info">
        <div className="user-info">
          <Link to={`/@${props?.channel.handle}`}>@{props?.channel.name}</Link>
          <span className="info-span">{calculateAge(props.comment.time ?? 0)}</span>
        </div>

        <p className="comment-text">{props.comment.comment}</p>

        <div className="comment-action btn-container">
          <div>
            <div className="yt-icon hover-highlight">
              <LikeOutlinedIcon />
            </div>
            {convertToInternationalNumber(props.comment.likes)}
          </div>

          <div>
            <div className="yt-icon hover-highlight">
              <DislikeOutlinedIcon />
            </div>
          </div>

          <div
            className="hover-highlight reply"
            onClick={() => setIsReplyActive((prevIsReplyActive) => !prevIsReplyActive)}
          >
            Reply
          </div>
        </div>

        {isReplyActive && <CommentForm commentId={props?.comment.id} />}

        {props.comment.replyCount > 0 && (
          <div>
            <div
              className="replies hover-highlight"
              onClick={() => setToggleReplies((prevToggleReplies) => !prevToggleReplies)}
            >
              <div className="yt-icon">{toggleReplies ? <CaretUp /> : <CaretDown />}</div>

              <div className="text">{convertToInternationalNumber(props.comment.replyCount, 'reply', 'replies')}</div>
            </div>

            {toggleReplies && (
              <Suspense fallback={<Loading />}>
                <UserComment
                  channel={{
                    name: 'Sarwang Jain',
                    handle: 'jainsarwang',
                    thumbnail: '/images/channels/ZeeTv.jpg?time=31832080',
                  }}
                  comment={{
                    id: 3,
                    comment: 'Ndsajdhs hdksahdahsd hkfjhdjfhhfdjfdjfl dfkjdlfj;l',
                    likes: 823910,
                    time: 10218924,
                  }}
                />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComment;
