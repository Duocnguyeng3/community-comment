import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, CommentDetail, LikeDetail, BackButton } from '../components';
import { useParams, Link } from 'react-router-dom';
import { comment_base_url } from '../utils/constants.js';
import { useCommentContext } from '../context/comment_context.js';
import { FaAngleLeft } from 'react-icons/fa';

function CommentPage() {
  const { id } = useParams();
  const {
    fetchSingleComment,
    single_comment,
    single_comment_loadings: loading,
    single_comment_error: error,
  } = useCommentContext();

  useEffect(() => {
    fetchSingleComment(`${comment_base_url}/comments/${id}`);
  }, [id]);

  return (
    <Wrapper>
      <Header />
      <BackButton />
      <div className="comment-detail-box">
        <CommentDetail
          singleComment={single_comment}
          loading={loading}
          error={error}
          fetchSingleComment={fetchSingleComment}
        />
      </div>
      <div className="like-detail-box">
        <LikeDetail singleComment={single_comment} loading={loading} error={error} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  .comment-detail-box {
    padding: 5rem;
    margin-bottom: 5rem;
    @media only screen and (max-width: 37.5em) {
      padding: 2rem;
    }
  }
  .like-detail-box {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
`;
export default CommentPage;
