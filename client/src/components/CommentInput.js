import React from 'react';
import styled from 'styled-components';
import { Loading, Error } from '../components';
import { useInputContext } from '../context/input_context.js';
import { all_comment_url, comment_base_url } from '../utils/constants';
import { useHistory } from 'react-router-dom';

function CommentInput() {
  const history = useHistory();

  const {
    new_comment,
    updateInput,
    new_comment_loadings: loading,
    new_comment_error: error,
    checkCommentObject,
    new_comment: { title, text },
    error_message,
    postComment,
  } = useInputContext();

  const handleSubmit = async (e) => {
    const comment = await postComment(all_comment_url, checkCommentObject(e));
    if (!comment) return;
    history.push(`/comment/${comment._id}`);
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="title"
          type="text"
          className="title"
          placeholder="Title"
          onChange={updateInput}
          value={new_comment.title}
        />
        <p className="error-message">{error_message}</p>
        <textarea
          name="comment"
          type="text"
          className="comment"
          onChange={updateInput}
          value={new_comment.comment}
        />
        <div className="control-box">
          <button className="btn cancel-btn">Cancel</button>
          <button className="btn" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: var(--color-primary);
  color: var(--color-secondary);
  form {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }
  .title {
    display: block;
    border: none;
    outline: none;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    border-bottom: 1px solid var(--color-tertiary);
    margin-top: 2rem;
    font-size: 3.5rem;
    font-weight: 600;
  }
  .comment {
    display: block;
    outline: none;
    margin-top: 2rem;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    font-weight: 600;
    margin-top: 5rem;
    font-size: 1.8rem;
    height: 30rem;
  }
  .error-message {
    font-size: 2rem;
    color: red;
  }
  .control-box {
    justify-self: flex-end;
    margin-left: auto;
  }
  .cancel-btn {
    background-color: transparent;
    color: var(--color-secondary);
  }
`;
export default CommentInput;
