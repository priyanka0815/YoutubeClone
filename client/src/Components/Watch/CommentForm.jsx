import React, { Suspense, useState } from "react";
import { AccountHandler } from "../inc";
import { EmojiIcon } from "../../utils/Icons";
import EmojiPicker, { Theme, EmojiStyle } from "emoji-picker-react";
import { useYtContext } from "../../utils/YTContext";
import { openConsentScreen } from "../../utils/functions";
import { API } from "../../utils/api";

const CommentForm = (props) => {
  const [input, setInput] = useState({});
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const [ytContextData] = useYtContext();

  const addComment = async (e) => {
    e.preventDefault();

    const form = e.target;

    if (form.parentId) {
      // replying
      const data = await API.addCommentReply({
        body: {
          part: "id,snippet",
          snippet: {
            parentId: form.parentId.value,
            textOriginal: form.comment.value,
          },
        },
        authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
      });

      if (!data.isError && data.snippet) {
        setInput({});

        props.setReplies((prevComments) => {
          console.log(prevComments);
          return [data, ...prevComments];
        });
      }
    } else {
      // commenting
      const data = await API.addVideoComments({
        body: {
          part: "snippet",
          snippet: {
            topLevelComment: {
              snippet: {
                videoId: props.videoId,
                textOriginal: form.comment.value,
              },
            },
          },
        },
        authorization: `${ytContextData.googleAuth.tokenType} ${ytContextData.googleAuth.accessToken}`,
      });

      if (!data.isError && data.snippet) {
        setInput({});

        props.setComments((prevComments) => [data, ...prevComments]);
      }
    }
  };

  return (
    <div className="comment_form">
      <AccountHandler allowSigninText={false} />

      <form autoComplete="off" onClick={!ytContextData.googleAuth ? openConsentScreen : () => {}} onSubmit={addComment}>
        <div className="form-field">
          {props.parentId && <input type="hidden" value={props.parentId} name="parentId" />}
          <input
            type="text"
            name="comment"
            placeholder="Add a Comment..."
            required
            value={input.comment ?? ""}
            onInput={(e) => setInput((prevInput) => ({ ...prevInput, comment: e.target.value }))}
          />
        </div>

        <div className="form-field">
          <div
            className="emoji-btn hover-highlight"
            onClick={() => setToggleEmoji((prevToggleEmoji) => !prevToggleEmoji)}
          >
            <EmojiIcon />
          </div>

          <EmojiPicker
            open={toggleEmoji}
            style={{
              position: "absolute",
              bottom: "80px",
              left: "0",
              width: "300px",
              height: "300px",
            }}
            theme={Theme.AUTO}
            emojiStyle={EmojiStyle.GOOGLE}
            lazyLoadEmojis={true}
            suggestedEmojisMode="recent"
            skinTonesDisabled={true}
            searchDisabled={true}
            allowExpandReactions={true}
            previewConfig={{ showPreview: false }}
            categories={[
              "suggested",
              "custom",
              "smileys_people",
              "animals_nature",
              "food_drink",
              "travel_places",
              "activities",
              "objects",
              "symbols",
              "flags",
            ]}
            onEmojiClick={(emoji, e) => {
              setInput((prevInput) => ({
                ...prevInput,
                comment: (prevInput.comment ?? "") + emoji.emoji,
              }));
            }}
          />

          <div className="btn-container">
            <button type="reset" className="hover-highlight">
              Cancel
            </button>
            <button type="submit">Comment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
