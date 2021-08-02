import axios from 'axios';
import React, { useContext, useReducer } from 'react';
// import reducer from '../reducer/commentReducer';
import { comment_base_url } from '../utils/constants';
import { useViewContext } from './view_context.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN_LOADING': {
      return {
        ...state,
        login_loading: true,
      };
    }
    case 'LOG_IN_SUCCESS': {
      localStorage.setItem('user', JSON.stringify(action.payload.user));

      return {
        ...state,
        login_loading: false,
        user: action.payload.user,
        isAuthen: true,
        email: '',
        password: '',
      };
    }
    case 'LOG_IN_FAIL': {
      return {
        ...state,
        login_loading: false,
      };
    }
    case 'LOG_OUT': {
      localStorage.removeItem('user');
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      return { ...state, user: '', isAuthen: false, email: '', password: '' };
    }
    default:
      throw new Error(`${action.type} is not match any action in auth reduder`);
  }
};
const checkAuthen = () => {
  return document.cookie?.includes('jwt=');
};
const checkUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  } else {
    return '';
  }
};

const AuthContext = React.createContext();
const initialState = {
  login_loading: false,
  email: '',
  password: '',
  user: checkUser(),
  isAuthen: checkAuthen(),
};
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showNotification } = useViewContext();

  const sendLogin = async (email, password) => {
    dispatch({ type: 'LOG_IN_LOADING' });
    try {
      const res = await axios({
        method: 'POST',
        url: `${comment_base_url}/users/login`,
        data: { email, password },
      });
      if (!res || res.data.status !== 'success') console.log('error login');
      const user = res.data.data.user;
      dispatch({ type: 'LOG_IN_SUCCESS', payload: { user } });
      showNotification('success', 'Login successfully');
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: 'LOG_IN_FAIL' });
      showNotification('fail', err.response?.data?.message || 'Error logging in');
    }
  };

  const sendSignup = async (name, email, password, passwordConfirm) => {
    dispatch({ type: 'LOG_IN_LOADING' });
    try {
      const res = await axios({
        method: 'POST',
        url: `${comment_base_url}/users/signup`,
        data: { name, email, password, passwordConfirm },
      });
      if (!res || res.data.status !== 'success') console.log('error signup');
      const user = res.data.data.user;
      dispatch({ type: 'LOG_IN_SUCCESS', payload: { user } });
      showNotification('success', 'Signup successfully');
      setTimeout(() => {
        window.location.replace('/');
      }, 1000);
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: 'LOG_IN_FAIL' });
      showNotification('fail', err.response?.data?.message || 'Error signing up');
    }
  };

  const signup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    sendSignup(name, email, password, passwordConfirm);
  };
  const login = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    sendLogin(email, password);
  };
  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOG_OUT' });
    window.location.reload();
  };

  return <AuthContext.Provider value={{ ...state, login, logout, signup }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
