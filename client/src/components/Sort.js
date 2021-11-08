import React from 'react';
import styled from 'styled-components';
import { useCommentContext } from '../context/comment_context';

function Sort() {
  const { handleSort } = useCommentContext();
  return (
    <Wrapper>
      <form>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort" onChange={handleSort}>
          <option value="date-newest">Date (newest)</option>
          <option value="date-oldest">Date (oldest)</option>
          <option value="most-likes">Most likes</option>
          <option value="your-comments">Your comments</option>
        </select>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 2rem;

  form {
    font-size: 1.8rem;
    color: var(--color-secondary);
  }
  label {
    margin-right: 2rem;
  }
  select {
    font-size: 2.2rem;
    border: none;
    background-color: var(--color-primary);
    color: var(--color-secondary);
  }
`;

export default Sort;
