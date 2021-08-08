import React from 'react';
import styled from 'styled-components';
import { Header, SignupForm, BackButton } from '../components';

function LoginPage() {
  return (
    <Wrapper>
      <Header />
      <BackButton />
      <h2 className="warning">Please signup before creating a comment</h2>
      <div className="login-box">
        <SignupForm />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  .warning {
    margin-left: 5rem;
    color: red;
    font-size: 2rem;
  }
`;
export default LoginPage;
