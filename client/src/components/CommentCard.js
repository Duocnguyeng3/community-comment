import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { getDate } from '../utils/getDate.js';
import { Link } from 'react-router-dom';
import { useLikeContext } from '../context/like_context.js';
import { useCommentContext } from '../context/comment_context.js';
import { LikeButton } from '../components';

// import
function CommentCard({ likes, title, createdAt, comment, _id }) {
  const { patchLike } = useLikeContext();
  const { updateLikeCount } = useCommentContext();

  // đặt State riêng cho mỗi card để khi loading, nút like hiện khác biệt

  // chuyển đổi trạng thái like
  const handleLike = async (type) => {
    const comment = await patchLike(_id, type);
    if (!comment) return;
    updateLikeCount(comment);
    return 'success';
  };

  return (
    <Wrapper>
      <Link to={`/comment/${_id}`} className="card">
        <div className="date">{getDate(createdAt)}</div>
        <h2>{title}</h2>
        <p>{comment}</p>
      </Link>
      <div className="like-box">
        <LikeButton handleLike={handleLike} />

        <span className="like-count">{likes}</span>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  color: var(--color-primary);
  .card {
    text-decoration: none;
    color: inherit;
    background-color: var(--color-tertiary);
    height: 10rem;
    padding: 1rem 2rem;
    display: grid;
    grid-template-columns: 1fr;
    border: 0.4rem solid transparent;
    transition: all 0.1s;

    &:hover,
    &:active,
    &:focus {
      border: 0.4rem solid var(--color-decoration);
    }
  }

  h2 {
    height: 3rem;
    font-size: 2.4rem;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }
  p {
    font-size: 1.6rem;
    color: var(--color-primary-light);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }
  svg {
    margin-right: 0.5rem;
    font-size: 3rem;
    justify-self: center;
    &:hover {
      cursor: pointer;
    }
  }
  span {
    font-size: 2rem;
    justify-self: center;
  }

  .like-box {
    color: var(--color-secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 10rem;
    position: absolute;
    bottom: -3.5rem;
  }

  .date {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;
export default CommentCard;
