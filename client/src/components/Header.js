import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
function Header() {
  return (
    <Wrapper>
      <h2>Community</h2>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  overflow: hidden;

  h2 {
    font-size: 5rem;
    padding: 2rem;
  }
`;

export default Header;
