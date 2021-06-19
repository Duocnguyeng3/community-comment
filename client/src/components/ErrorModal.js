import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegWindowClose } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useSingleCommentContext } from '../context/single_comment_context.js';

function ErrorModal() {
  //   const [error, setError] = useState({ message: '', display: false });
  const { patch_like_error, error_message, resetError, delete_error } = useSingleCommentContext();

  if (!patch_like_error && !delete_error) return <></>;

  return (
    <Wrapper>
      <div className="modal">
        <button className="close-btn" onClick={resetError}>
          <AiOutlineClose />
        </button>
        <h2 className="error-message">{error_message}</h2>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;

  .error-message {
    font-size: 3rem;
    color: red;
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    /* margin-top: -100px; */
    /* margin-left: -150px; */
    transform: translate(-50%, -50%);
    background-color: var(--color-secondary);
    z-index: 11;
    border-radius: 3px;
    padding: 2rem;
    /* display: flex;
    align-items: center;
    justify-content: center; */
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    display: flex;
    align-items: center;
    margin-left: auto;
    transition: all 0.2s;
    border: 1px solid transparent;
    border-radius: 50%;
    margin-top: -1rem;
    margin-right: -1rem;
    svg {
      margin-left: auto;
    }
    &:hover {
      border: 1px solid var(--color-primary);
    }
  }
  .error-message {
  }
`;
export default ErrorModal;
