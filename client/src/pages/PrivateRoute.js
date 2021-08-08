import React from 'react';
import { useAuthContext } from '../context/auth_context';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, ...rest }) {
  const { user, isAuthen } = useAuthContext();
  const checkAuth = user && isAuthen;

  const notiAndRedirect = () => {
    return <Redirect to="/signup" />;
  };
  return <Route {...rest} render={() => (checkAuth ? children : notiAndRedirect())} />;
}

export default PrivateRoute;
