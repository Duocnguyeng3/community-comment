import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CommentCard, Error, Loading } from '../components';
import { useCommentContext } from '../context/comment_context';

function CommentList() {
  const { comments, comment_loadings: loading, comment_error: error } = useCommentContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Wrapper>
      <div className="comment-container">
        {comments.map((cmt) => (
          <CommentCard key={cmt._id} {...cmt} />
        ))}
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .comment-container {
    grid-column: 2/3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10rem;
    grid-row-gap: 6rem;

    @media only screen and (max-width: 62.5em) {
      grid-column-gap: 7rem;
    }
    @media only screen and (max-width: 37.5em) {
      grid-template-columns: 1fr;
    }
  }

  .alert-title {
    color: var(--color-secondary);
  }
`;
export default CommentList;
