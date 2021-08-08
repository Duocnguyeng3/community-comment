import React from 'react';
import styled from 'styled-components';
import { Header, CommentInput, BackButton } from '../components';

function CreateCommentPage() {
  return (
    <Wrapper>
      <Header />
      <BackButton />
      <div className="comment-input-box">
        <CommentInput />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
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
