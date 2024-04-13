import React, { Suspense, useEffect, useState } from "react";
import { SignInUserIcon, SortIcon } from "../../utils/Icons";
import { AccountHandler, Loading } from "../inc";
import UserComment from "./UserComment";
import CommentForm from "./CommentForm";
import { API } from "../../utils/api";
import { constructQueryFromObj } from "../../utils/functions";

const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [queryData, setQueryData] = useState({
    part: `id,snippet,replies`,
    maxResults: 50,
    order: `relevance`,
  });

  useEffect(() => {
    async function fetchComments() {
      const data = await API.getVideoComments(constructQueryFromObj(queryData) + `&videoId=${props.videoId}`);

      if (!data.isError) setComments((prevComments) => data?.items ?? []);
    }

    if (props.videoId) {
      fetchComments();
    }
  }, [props.videoId]);

  return (
    <div id="comment_section_container">
      <div className="heading">
        <div>{props.commentCount ?? 0} Comments</div>

        <div className="btn-icon">
          <div className="icon">
            <SortIcon />
          </div>
          <div className="text">Sort by</div>
        </div>
      </div>

      <CommentForm setComments={setComments} videoId={props.videoId} />

      <div id="comment_section">
        <Suspense fallback={<Loading />}>
          {comments.map((comment, idx) => (
            <UserComment
              key={idx}
              commentId={comment.id}
              commentData={comment?.snippet.topLevelComment.snippet}
              canReply={comment?.snippet.canReply}
              replyCount={comment?.snippet.totalReplyCount}
              replies={comment?.replies?.comments}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Comment;
