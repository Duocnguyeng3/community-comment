import React, { useState } from 'react';
import styled from 'styled-components';
import { getDate } from '../utils/getDate.js';
import { Loading, Error } from '../components';
import { comment_base_url } from '../utils/constants.js';

function CommentDetail({ singleComment, error, loading, fetchSingleComment }) {
  if (loading) return <Loading />;
  if (error) return <Error handleReload={() => fetchSingleComment(comment_base_url)} />;

  const { title, createdAt, comment, createdBy } = singleComment;
  return (
    <Wrapper>
      <div className="comment-info">
        <span>{getDate(createdAt)}</span>
        <span>Created by: {createdBy?.userName}</span>
      </div>
      <h2 className="detail-title">{title}</h2>
      <p className="detail-comment">{comment}</p>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  color: var(--color-tertiary);

  .comment-info {
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    justify-self: center;
    color: var(--color-primary-light-2);
  }
  .detail-title {
    margin-top: 2rem;
    font-size: 4rem;
    font-weight: 600;
  }
  .detail-comment {
    margin-top: 5rem;
    font-size: 2rem;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.6;
    white-space: pre-wrap;
    max-width: 100rem;
  }
  svg {
    margin-right: 0.5rem;
    font-size: 3rem;
    justify-self: center;
    &:hover {
      cursor: pointer;
    }
  }
  .like-box {
    color: var(--color-secondary);
    display: flex;
    justify-content: space-between;
    width: 10rem;
    position: absolute;
    bottom: -3.5rem;
  }
  .like-button {
    background-color: transparent;
    border: none;
    color: var(--color-secondary);
    font-size: 1.8rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-space-around;

    &:hover {
      cursor: pointer;
      color: var(--color-secondary);
    }
    svg {
      font-size: 1.6rem;
    }
  }
  .date {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;
export default CommentDetail;
