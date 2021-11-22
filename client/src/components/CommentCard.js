import React from 'react';
import styled from 'styled-components';
import { getDate } from '../utils/getDate.js';
import { Link } from 'react-router-dom';
import { useSingleCommentContext } from '../context/single_comment_context.js';
import { useCommentContext } from '../context/comment_context.js';
import { LikeButton, DeleteButton } from '../components';

// import
function CommentCard({ likes, title, createdAt, comment, _id, createdBy, likedBy, isYour }) {
  const { patchLike, deleteComment } = useSingleCommentContext();
  const { updateLikeCount, updateDeleteComment } = useCommentContext();
  // đặt State riêng cho mỗi card để khi loading, nút like hiện khác biệt

  // chuyển đổi trạng thái like
  const handleLike = async (type) => {
    const comment = await patchLike(_id, type);
    if (!comment) return;
    updateLikeCount(comment);
    return 'success';
  };

  const handleDelete = async () => {
    const results = await deleteComment(_id);
    if (results === 'success') return updateDeleteComment(_id);
  };

  return (
    <Wrapper>
      <Link to={`/comment/${_id}`} className="card">
        <div className="comment-info">
          <div>{getDate(createdAt)}</div>
          <div>By: {createdBy?.userName}</div>
        </div>
        <h2>{title}</h2>
        <p>{comment}</p>
      </Link>
      <div className="like-box">
        <LikeButton handleLike={handleLike} likedBy={likedBy} />

        <span className="like-count">{likes}</span>
      </div>
      <div className="delete-button">
        <DeleteButton handleDelete={handleDelete} isYour={isYour} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  color: var(--color-secondary);
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
  .delete-button {
    /* color: var(--color-secondary); */
    display: flex;
    position: absolute;
    bottom: -3.5rem;
    right: 0;
  }

  .comment-info {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
  /* .error-message {
    display: inline-block;
    font-size: 1.6rem;
    color: red;
  } */
`;
export default CommentCard;
