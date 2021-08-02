import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, LoginForm } from '../components';
import { useParams, Link } from 'react-router-dom';
import { comment_base_url } from '../utils/constants.js';
import { useCommentContext } from '../context/comment_context.js';
import { FaAngleLeft } from 'react-icons/fa';

function LoginPage() {
  return (
    <Wrapper>
      <Header />
      <Link to="/" className="back-button">
        <FaAngleLeft />
      </Link>
      <div className="login-box">
        <LoginForm />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  .back-button {
    display: block;
    margin-top: 2rem;
    margin-left: 2rem;
    color: var(--color-secondary);
    font-size: 5rem;
  }
`;
export default LoginPage;
