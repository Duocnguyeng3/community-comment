import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Header, SignupForm } from '../components';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

function LoginPage() {
  return (
    <Wrapper>
      <Header />
      <Link to="/" className="back-button">
        <FaAngleLeft />
      </Link>
      <div className="login-box">
        <SignupForm />
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
