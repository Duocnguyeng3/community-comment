import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CommentCard, Error, Loading } from '../components';
import { useCommentContext } from '../context/comment_context';
import { useAuthContext } from '../context/auth_context';
import { all_comment_url } from '../utils/constants';

function CommentList() {
  const { comments, comment_loadings: loading, comment_error: error, fetchComments } = useCommentContext();
  const { user } = useAuthContext();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error handleReload={() => fetchComments(all_comment_url)} />;
  }

  if (comments.length < 1) {
    return (
      <Wrapper>
        <div className="alert-container">
          <h2 className="alert-title">There's no comments right now</h2>;
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="comment-container">
        {/* {comments.map((cmt) => (
          <CommentCard key={cmt._id} {...cmt} />
        ))} */}
        {comments.map((cmt) => {
          if (user._id === cmt.createdBy.userId) {
            cmt.isYour = true;
          } else {
            cmt.isYour = false;
          }
          return <CommentCard key={cmt._id} {...cmt} />;
        })}
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
  .alert-container {
    text-align: center;
  }
  .alert-title {
    color: var(--color-secondary);
    font-size: 2.5rem;
  }
`;
export default CommentList;
