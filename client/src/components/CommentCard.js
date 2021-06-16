import React from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { getDate } from '../utils/getDate.js';
import { Link } from 'react-router-dom';

function CommentCard({ likes, title, createdAt, comment, _id }) {
  return (
    <Wrapper>
      <Link to={`/comment/${_id}`} className="card">
        <div className="date">{getDate(createdAt)}</div>
        <h2>{title}</h2>
        <p>{comment}</p>
      </Link>
      <div className="like-box">
        <button className="like-button">
          <FaThumbsUp />
          Like
        </button>
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
  .like-button {
    background-color: transparent;
    border: none;
    color: var(--color-secondary);
    font-size: 1.8rem;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    &:hover {
      cursor: pointer;
      color: var(--color-secondary);
    }
    & svg {
      font-size: 2rem;
    }
  }

  .like-count {
    line-height: 1;
  }
  .date {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;
export default CommentCard;
