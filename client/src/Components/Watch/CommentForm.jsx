import React, { Suspense, useState } from 'react';
import { AccountHandler } from '../inc';
import { EmojiIcon } from '../../utils/Icons';
import EmojiPicker, { Theme, EmojiStyle } from 'emoji-picker-react';

const CommentForm = (props) => {
  const [input, setInput] = useState({});
  const [toggleEmoji, setToggleEmoji] = useState(false);

  return (
    <div className="comment_form">
      <AccountHandler allowSigninText={false} />

      <form autoComplete="off">
        <div className="form-field">
          <input
            type="text"
            name="comment"
            placeholder="Add a Comment..."
            required
            value={input.comment ?? ''}
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
              position: 'absolute',
              bottom: '80px',
              left: '0',
              width: '300px',
              height: '300px',
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
              'suggested',
              'custom',
              'smileys_people',
              'animals_nature',
              'food_drink',
              'travel_places',
              'activities',
              'objects',
              'symbols',
              'flags',
            ]}
            onEmojiClick={(emoji, e) => {
              setInput((prevInput) => ({
                ...prevInput,
                comment: (prevInput.comment ?? '') + emoji.emoji,
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
