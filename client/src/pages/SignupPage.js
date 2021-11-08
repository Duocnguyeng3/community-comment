import React from 'react';
import styled from 'styled-components';
import { Header, SignupForm, BackButton } from '../components';

function LoginPage() {
  return (
    <Wrapper>
      <Header />
      <BackButton />
      <div className="login-box">
        <SignupForm />
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main``;
export default LoginPage;
