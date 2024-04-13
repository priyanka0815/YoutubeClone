import React, { Suspense, useState } from "react";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { calculateAge, convertToInternationalNumber } from "../../utils/functions";
import { CaretDown, CaretUp, DislikeOutlinedIcon, LikeOutlinedIcon } from "../../utils/Icons";
import { Loading } from "../inc";

const UserComment = (props) => {
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [toggleReplies, setToggleReplies] = useState(false);
  const [replies, setReplies] = useState(props.replies);

  return (
    <div className="comment">
      <div className="user-img">
        <Link to={`/${props.commentData.authorDisplayName}`}>
          <img
            src={props.commentData.authorProfileImageUrl}
            alt={`${props.commentData.authorDisplayName}&apos;s Logo`}
          />
        </Link>
      </div>

      <div className="info">
        <div className="user-info">
          <Link to={`/${props.commentData.authorDisplayName}`}>{props.commentData.authorDisplayName}</Link>
          <span className="info-span">{calculateAge(props.commentData.publishedAt ?? 0)}</span>
        </div>

        <p className="comment-text" dangerouslySetInnerHTML={{ __html: props.commentData.textDisplay }}></p>

        <div className="comment-action btn-container">
          {props.commentData.canRate && (
            <>
              <div>
                <div className={`yt-icon hover-highlight ${props.commentData.viewerRating == "like" ? "fill" : ""}`}>
                  <LikeOutlinedIcon />
                </div>
                {convertToInternationalNumber(props.commentData.likeCount)}
              </div>

              <div>
                <div className="yt-icon hover-highlight">
                  <DislikeOutlinedIcon />
                </div>
              </div>
            </>
          )}

          {props.canReply && (
            <div
              className="hover-highlight reply"
              onClick={() => setIsReplyActive((prevIsReplyActive) => !prevIsReplyActive)}
            >
              Reply
            </div>
          )}
        </div>

        {props.canReply && isReplyActive && <CommentForm parentId={props.commentId} setReplies={setReplies} />}

        {props.replyCount > 0 && (
          <div>
            <div
              className="replies hover-highlight"
              onClick={() => setToggleReplies((prevToggleReplies) => !prevToggleReplies)}
            >
              <div className="yt-icon">{toggleReplies ? <CaretUp /> : <CaretDown />}</div>

              <div className="text">{convertToInternationalNumber(props.replyCount, "reply", "replies")}</div>
            </div>

            {toggleReplies && (
              <Suspense fallback={<Loading />}>
                {replies.length > 0 &&
                  replies &&
                  replies.map((reply, idx) => (
                    <UserComment
                      key={idx}
                      // parentId={props.commentId}
                      commentData={reply.snippet}
                      // canReply={false}
                      // replyCount={0}
                    />
                  ))}
              </Suspense>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComment;
