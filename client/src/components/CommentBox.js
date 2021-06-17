import React from 'react';
import styled from 'styled-components';
import { CommentCard, CommentList, Sort, SearchBox } from '../components';
import { Link } from 'react-router-dom';

function CommentBox() {
  return (
    <Wrapper>
      <Link to="/create-comment" className="input-link">
        Create your new comment here...
      </Link>
      <div className="control-container">
        <SearchBox />
        <Sort />
      </div>
      <div className="comment-list-container">
        <CommentList />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr minmax(0, 125rem) 1fr;
  margin-top: 5rem;
  margin-bottom: 10rem;

  .input-link {
    background-color: var(--color-secondary);
    color: var(--color-primary);
    font-size: 2rem;
    grid-column: 2/3;
    height: 10rem;
    width: 30%;
    margin-bottom: 5rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding-left: 2rem;
    font-size: 2rem;
    font-weight: 600;
    color: var(--color-primary-light);
  }
  .comment-list-container {
    grid-column: 2/3;
  }
  .control-container {
    grid-column: 2/3;
    align-self: center;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
`;
export default CommentBox;
