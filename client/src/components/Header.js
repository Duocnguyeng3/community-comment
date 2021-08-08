import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from '../components';
function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <h2>Community</h2>
      </Link>
      <User />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  overflow: hidden;
  a {
    text-decoration: none;
    color: var(--color-secondary);
  }
  h2 {
    font-size: 5rem;
    padding: 2rem;
    @media only screen and (max-width: 37.5em) {
      font-size: 3rem;
      padding: 1rem;
    }
  }
`;

export default Header;
