import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

function BackButton() {
  const history = useHistory();

  return (
    <Wrapper className="back-button" onClick={history.goBack}>
      <FaAngleLeft />
    </Wrapper>
  );
}
const Wrapper = styled.button`
  background: none;
  border: none;
  outline: none;
  display: block;
  margin-top: 2rem;
  margin-left: 2rem;
  color: var(--color-secondary);
  font-size: 5rem;
`;

export default BackButton;
