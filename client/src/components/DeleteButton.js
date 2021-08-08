import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSingleCommentContext } from '../context/single_comment_context.js';
import { useAuthContext } from '../context/auth_context';
import { useViewContext } from '../context/view_context';

function DeleteButton({ handleDelete, isYour }) {
  const { delete_loadings: loading } = useSingleCommentContext();
  const { user, isAuth } = useAuthContext();
  const { showNotification } = useViewContext();

  // đặt State riêng cho mỗi card để khi loading, nút like hiện khác biệt
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteButton = () => {
    if (!user && !isAuth)
      return showNotification('fail', 'You are not logged in, please log in and try again');
    setDeleteLoading(true);
    handleDelete();
  };

  useEffect(() => {
    if (!loading) setDeleteLoading(false);
  }, [loading]);

  if (!isYour && user.role !== 'admin') return <></>;

  return (
    <Wrapper onClick={() => handleDeleteButton()} disabled={deleteLoading}>
      {deleteLoading && (
        <div className="layer">
          <div className="loader"></div>
        </div>
      )}
      Delete
    </Wrapper>
  );
}
const Wrapper = styled.button`
  outline: none;
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
  .like-count {
    line-height: 1;
  }
`;

export default DeleteButton;
