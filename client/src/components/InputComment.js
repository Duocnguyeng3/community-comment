import React from 'react';
import styled from 'styled-components';

function InputComment() {
  return (
    <Wrapper action="">
      <label className="title-label" htmlFor="title">
        title
      </label>
      <input name="title" id="title" type="text" placeholder="" />
      {/* <hr /> */}
      <input classname="comment" name="comment" id="comment" type="text" placeholder="comment" />
    </Wrapper>
  );
}
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  margin: 0 auto;
  input {
    border: 0.1px solid #ccc;
    font-size: 2.8rem;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    outline: none;
    height: 5rem;
    padding: 0rem 1rem;
    margin-bottom: 1rem;
  }
  .comment {
    /* max-height: 4rem; */
  }
  .title-label {
    color: var(--color-secondary);
    z-index: 1;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`;
export default InputComment;
