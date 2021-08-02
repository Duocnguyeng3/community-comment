import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/auth_context';

function Header() {
  const { user, isAuthen, logout } = useAuthContext();

  if (user && isAuthen)
    return (
      <Wrapper>
        <h3 className="user-name">Welcome, {user.name}</h3>
        <button className="btn log-user" onClick={logout}>
          Log out
        </button>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Link className="sign-up" to="/signup">
        Sign up
      </Link>
      <Link className="btn log-user" to="/login">
        Log in
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  overflow: hidden;
  color: var(--color-secondary);
  font-size: 1.8rem;
  a {
    text-decoration: none;
    color: var(--color-secondary);
  }
  .user-name {
  }
  .log-user {
    background-color: var(--color-decoration);
    text-transform: uppercase;
    color: var(--color-secondary);

    &:hover {
      background-color: var(--color-decoration-light);
    }
  }
  .sign-up {
    padding: 2rem;
  }
`;

export default Header;
