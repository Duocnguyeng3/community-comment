import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/auth_context';
import { Button } from '@material-ui/core';
import theme from '../theme';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Typography, Stack, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

// const useStyles = makeStyles((theme) => ({
//   backgroundColor: theme.palette.neutral.main,
// }));
// const useStyles = makeStyles((theme) => ({
//   backgroundColor: theme.palette.neutral.main,
//   color: '#db0473',
// }));
// console.log(typeof theme.palette.neutral.main);
function Header() {
  const { user, isAuthen, logout } = useAuthContext();
  // const classes = useStyles();
  if (user && isAuthen)
    return (
      <Wrapper>
        <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
          <Typography variant="h3" align="center" color="primary">
            Welcome, {user.name}
          </Typography>
          <Button color="neutral" variant="contained" onClick={logout} startIcon={<LogoutIcon />}>
            Log out
          </Button>
        </Stack>
        {/* <h3 className="user-name">Welcome, {user.name}</h3> */}
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

// display: flex;
// align-items: center;
// background-color: var(--color-primary);
// overflow: hidden;
// color: var(--color-secondary);

const Wrapper = styled.header`
  a {
    text-decoration: none;
    color: var(--color-secondary);
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
