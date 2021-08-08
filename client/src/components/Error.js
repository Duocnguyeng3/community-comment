import React from 'react';
import styled from 'styled-components';

function Error({ handleReload }) {
  return (
    <Wrapper>
      <h2>Error fetching data, please try again</h2>
      <button className="btn" onClick={handleReload}>
        Reload
      </button>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  text-align: center;
  h2 {
    margin-top: 4rem;
    color: var(--color-secondary);
    font-size: 3rem;
  }
`;
export default Error;
