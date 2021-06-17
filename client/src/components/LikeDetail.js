import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { LikeButton } from '../components';
import { useCommentContext } from '../context/comment_context.js';
import { useLikeContext } from '../context/like_context.js';

function LikeDetail({ singleComment, loading, error }) {
  const { patchLike } = useLikeContext();
  const { updateSingleLikeCount } = useCommentContext();

  const { likes, _id } = singleComment;

  const handleLike = async (type) => {
    const comment = await patchLike(_id, type);
    if (!comment) return;
    updateSingleLikeCount(comment);
    return 'success';
  };

  if (loading || error) {
    return <></>;
  }

  return (
    <Wrapper>
      <hr />
      <div className="like-box">
        <p className="comment-count"> {likes} people like this post</p>
        <LikeButton handleLike={handleLike} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: var(--color-primary);
  color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  hr {
    height: 1px;
    border: none;
    background-color: var(--color-primary-light);
  }
  .like-box {
    /* background-color: red; */
    margin-top: 2rem;
    font-size: 4rem;
    padding: 0 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  }
  .like-button {
    background-color: transparent;
    border: none;
    color: var(--color-secondary);
    padding: 0.5rem 1rem;
    display: flex;
    font-size: 2.25rem;

    &:hover {
      cursor: pointer;
      color: var(--color-secondary);
    }
    svg {
      margin-right: 0.5rem;
    }
  }

  .comment-count {
    font-size: 2rem;
  }
`;
export default LikeDetail;
