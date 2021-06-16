import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

function SearchBox() {
  return (
    <Wrapper>
      <form>
        <input type="text" placeholder="search..." />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  form {
    display: flex;
    align-items: flex-end;
  }

  input {
    font-size: 2.5rem;
    height: 100%;
    background-color: transparent;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 5px;

    &:placeholder {
      font-size: 2rem;
      color: red;
    }
  }

  button {
    color: transparent;
    font-size: 2.5rem;
    display: flex;
    background-color: transparent;
    border: none;
    align-items: center;
    right: 0;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  input:not(:placeholder-shown) + button {
    color: var(--color-secondary);
  }
`;
export default SearchBox;
