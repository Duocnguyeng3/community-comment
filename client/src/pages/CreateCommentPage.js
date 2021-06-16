import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, CommentInput } from '../components';
import { useParams, Link } from 'react-router-dom';
import { comment_base_url } from '../utils/constants.js';
import { useCommentContext } from '../context/comment_context.js';
import { FaAngleLeft } from 'react-icons/fa';

function CreateCommentPage() {
  return (
    <Wrapper>
      <Header />
      <Link to="/" className="back-button">
        <FaAngleLeft />
      </Link>
      <div className="comment-input-box">
        <CommentInput />
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
  .comment-input-box {
    padding: 5rem;
    margin-bottom: 5rem;
  }
  .like-detail-box {
    width: 100vw;
    position: fixed;
    bottom: 0;
  }
`;
export default CreateCommentPage;
