import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useViewContext } from '../context/view_context.js';

function NotificationPopup() {
  const { notificationShow, closeNotification, type, message } = useViewContext();

  return !notificationShow ? (
    <></>
  ) : (
    <Wrapper>
      <div className="popup">
        <button className="close-btn" onClick={closeNotification}>
          <AiOutlineClose />
        </button>
        <h2 className="popup-message">{message}</h2>
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
  /* display: none; */
  .popup-message {
    font-size: 3rem;
    color: red;
  }
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-secondary);
    z-index: 11;
    border-radius: 3px;
    padding: 2rem 4rem;
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
    margin-right: -3rem;
    svg {
      margin-left: auto;
    }
    &:hover {
      border: 1px solid var(--color-primary);
    }
  }
`;
export default NotificationPopup;
