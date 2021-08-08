import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../context/auth_context.js';

function Login() {
  const { signup, login_loading } = useAuthContext();

  return (
    <Wrapper onSubmit={signup}>
      <h2 className="title">SIGN UP FOR AN ACCOUNT</h2>
      <label className="label" htmlFor="name">
        name address
      </label>
      <input name="name" id="name" type="text" placeholder="name" />

      <label className="label" htmlFor="email">
        Email address
      </label>
      <input name="email" id="email" type="email" placeholder="you@examle.com" />

      <label className="label" htmlFor="password">
        Password
      </label>
      <input name="password" id="password" type="password" placeholder="**********" />

      <label className="label" htmlFor="passwordConfirm">
        Password Confirm
      </label>
      <input name="passwordConfirm" id="passwordConfirm" type="password" placeholder="**********" />
      {login_loading ? (
        <div className="loader login-loader"></div>
      ) : (
        <button className="btn center" type="submit" disabled={login_loading}>
          Signup
        </button>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.form`
  /* background-color: var(--color-secondary); */
  display: flex;
  flex-direction: column;
  max-width: 80rem;
  padding: 2rem;
  margin: 0 auto;
  color: var(--color-secondary);
  input {
    border: 0.1px solid #ccc;
    font-size: 2.8rem;
    background-color: var(--color-primary);
    color: var(--color-secondary);
    outline: none;
    height: 5rem;
    padding: 0rem 1rem;
    margin-bottom: 4rem;
  }
  .title {
    font-size: 3rem;
    margin-bottom: 5rem;
  }
  .label {
    color: var(--color-secondary);
    z-index: 1;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .loader {
    border: 3px solid #f3f3f3;
    border-radius: 50%;
    border-top: 3px solid #3498db;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  .login-loader {
    width: 5rem;
    margin: 0 auto;
    width: 2rem;
    height: 2rem;
  }
  .center {
    width: 5rem;
    margin: 0 auto;
  }
`;
export default Login;
