import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <Wrapper>
      <h2>Loading</h2>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  text-align: center;
  h2 {
    margin-top: 4rem;
    font-size: 3rem;
    animation: loading 2s infinite;
  }
  @keyframes loading {
    0% {
      color: transparent;
    }
    50% {
      color: transparent;
    }
    50% {
      color: var(--color-secondary);
    }
    100% {
      color: transparent;
    }
  }
`;
export default Loading;
