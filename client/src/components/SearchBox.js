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
  margin-bottom: 2rem;
  flex: 1;
  max-width: 50rem;
  min-width: 15rem;

  form {
    display: flex;
    margin-right: 2rem;
  }

  input {
    font-size: 2.5rem;
    width: 100%;
    background-color: transparent;
    color: #fff;
    outline: none;
    border: 2px solid transparent;
    transition: all 0.2s;
    padding: 0;
    padding-right: 3.5rem;
    display: flex;
    align-items: center;

    &:placeholder {
      font-size: 2rem;
    }
  }

  button {
    color: transparent;
    font-size: 2.5rem;
    display: flex;
    background-color: transparent;
    border: none;
    align-items: center;
    transition: all 0.2s;
    margin-left: -3rem;
    outline: none;
    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }
  }

  input:not(:placeholder-shown) + button {
    color: var(--color-secondary);
  }
  input:focus {
    border: 2px solid var(--color-primary-light);
    padding: 0.5rem 1rem;
    padding-right: 3.5rem;
  }
`;
export default SearchBox;
