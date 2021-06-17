import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { useLikeContext } from '../context/like_context.js';
// import
function LikeButton({ handleLike }) {
  const { patch_like_loadings: loading } = useLikeContext();
  const [likeType, setLikeType] = useState(true);

  // đặt State riêng cho mỗi card để khi loading, nút like hiện khác biệt
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLikeButton = async () => {
    const likeUpdate = await handleLike(likeType);
    if (likeUpdate === 'success') setLikeType(!likeType);
  };

  useEffect(() => {
    if (!loading) setLikeLoading(false);
  }, [loading]);

  return (
    <Wrapper className="like-button" onClick={() => handleLikeButton()}>
      {likeLoading && (
        <div className="layer">
          <div className="loader"></div>
        </div>
      )}
      <FaThumbsUp />
      Like
    </Wrapper>
  );
}
const Wrapper = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-secondary);
  font-size: 1.8rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  transition: all 0.2s;
  backface-visibility: hidden;
  &:hover {
    cursor: pointer;
    color: var(--color-secondary);
    transform: scale(1.05);
  }
  & svg {
    font-size: 2rem;
  }
  .layer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader {
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid #3498db;
    width: 1rem;
    height: 1rem;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .like-count {
    line-height: 1;
  }
`;

export default LikeButton;
