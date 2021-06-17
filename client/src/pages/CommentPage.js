import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, CommentDetail, LikeDetail } from '../components';
import { useParams, Link } from 'react-router-dom';
import { comment_base_url } from '../utils/constants.js';
import { useCommentContext } from '../context/comment_context.js';
import { FaAngleLeft } from 'react-icons/fa';

function CommentPage() {
  const [loading, setLoading] = useState(true);

  const {
    fetchSingleComment,
    single_comment,
    // single_comment_loadings: loading,
    single_comment_error: error,
  } = useCommentContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleComment(`${comment_base_url}/comments/${id}`).then(() => setLoading(false));
  }, [id]);

  return (
    <Wrapper>
      <Header />
      <Link to="/" className="back-button">
        <FaAngleLeft />
      </Link>
      <div className="comment-detail-box">
        <CommentDetail singleComment={single_comment} loading={loading} error={error} />
      </div>
      <div className="like-detail-box">
        <LikeDetail singleComment={single_comment} loading={loading} error={error} />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  .back-button {
    display: block;
    margin-top: 2rem;
    margin-left: 2rem;
    color: var(--color-secondary);
    font-size: 5rem;
  }
  .comment-detail-box {
    padding: 5rem;
    margin-bottom: 5rem;
  }
  .like-detail-box {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
`;
export default CommentPage;

//  loading={loading}
