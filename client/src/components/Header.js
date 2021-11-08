import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from '../components';
// import {} from '../../public/'
import { CardMedia } from '@material-ui/core';
function Header() {
  return (
    <Wrapper>
      <img alt="logo" src={process.env.PUBLIC_URL + '/community_logo.png'} />
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
