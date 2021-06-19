import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Wrapper>
      <Link to="/">
        <h2>Community</h2>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
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
  }
`;

export default Header;
