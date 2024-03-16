import React from 'react';
import { SignInUserIcon, SortIcon } from '../../utils/Icons';
import { AccountHandler } from '../inc';
import UserComment from './UserComment';
import CommentForm from './CommentForm';

const Comment = () => {
  return (
    <div id="comment_section_container">
      <div className="heading">
        <div>340 Comments</div>

        <div className="btn-icon">
          <div className="icon">
            <SortIcon />
          </div>
          <div className="text">Sort by</div>
        </div>
      </div>

      <CommentForm />

      <div id="comment_section">
        <UserComment
          channel={{ name: 'Sarwang Jain', handle: 'jainsarwang', thumbnail: '/images/channels/ZeeTv.jpg' }}
          comment={{
            id: 3,
            comment:
              'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ',
            likes: 823910,
            time: 10218924,
            replyCount: 2,
          }}
        />
        <UserComment
          channel={{ name: 'Sarwang Jain', handle: 'jainsarwang', thumbnail: '/images/channels/ZeeTv.jpg' }}
          comment={{
            id: 3,
            comment:
              'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ',
            likes: 823910,
            time: 10218924,
            replyCount: 2,
          }}
        />
        <UserComment
          channel={{ name: 'Sarwang Jain', handle: 'jainsarwang', thumbnail: '/images/channels/ZeeTv.jpg' }}
          comment={{
            id: 3,
            comment:
              'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ',
            likes: 823910,
            time: 10218924,
            replyCount: 2,
          }}
        />
        <UserComment
          channel={{ name: 'Sarwang Jain', handle: 'jainsarwang', thumbnail: '/images/channels/ZeeTv.jpg' }}
          comment={{
            id: 3,
            comment:
              'Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test ',
            likes: 823910,
            time: 10218924,
            replyCount: 2,
          }}
        />
      </div>
    </div>
  );
};

export default Comment;
