import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/auth_context';
import { Button } from '@material-ui/core';
import theme from '../theme';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { LogoutIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.neutral.main,
  },
}));

function Header() {
  const { user, isAuthen, logout } = useAuthContext();
  const classes = useStyles();
  if (user && isAuthen)
    return (
      <Wrapper>
        {/* <h3 className="user-name">Welcome, {user.name}</h3> */}
        <Typography variant="h3" align="center" color="primary" className="user-name">
          Welcome, {user.name}
        </Typography>
        <Button color="primary" variant="contained" onClick={logout}>
          Log out
        </Button>
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
    /* background-color: var(--color-decoration); */
    text-transform: uppercase;
    /* color: var(--color-secondary); */

    /* &:hover {
      background-color: var(--color-decoration-light);
    } */
  }
  .sign-up {
    padding: 2rem;
  }
`;

export default Header;
