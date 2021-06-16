import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h3>Sorry, The Page You Tried Cannot Be Found</h3>
        <Link className="btn" to="/">
          Back home
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  text-align: center;
  h1 {
    color: var(--color-secondary);
    font-size: 10rem;
  }
  h3 {
    color: var(--color-secondary);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
