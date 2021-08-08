import React from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useCommentContext } from '../context/comment_context';

function Pagination() {
  const { currentPage, allPages, changePage } = useCommentContext();
  const disabledPageUp = currentPage >= allPages;
  const disabledPageDown = currentPage <= 1;
  const handleChangePage = (counter) => {
    if (counter < 0) {
      return changePage(currentPage === 1 ? 0 : currentPage + counter);
    }
    if (counter > 0) {
      return changePage(currentPage === allPages ? currentPage : currentPage + counter);
    }
  };

  return (
    <Wrapper>
      <button className="page-button" onClick={() => handleChangePage(-1)} disabled={disabledPageDown}>
        <FaAngleLeft />
      </button>
      <p className="page-count">
        <input
          min={1}
          max={allPages}
          className="curren-page"
          type="number"
          value={currentPage}
          onChange={(e) => changePage(e.target.value)}
        />
        / {allPages}
        {/* {currentPage}/{allPages} */}
      </p>
      <button className="page-button" onClick={() => handleChangePage(1)} disabled={disabledPageUp}>
        <FaAngleRight />
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 20rem;
  margin: 3rem auto;
  align-items: center;
  justify-content: space-between;

  .page-count {
    color: var(--color-secondary);
    font-size: 2rem;
  }
  .page-button {
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
  }
  .curren-page {
    font-size: 2rem;
    display: inline-block;
    text-align: center;
    width: 2rem;
    margin-right: 0.7rem;
    color: var(--color-secondary);
    border: none;
    border-bottom: 1px solid var(--color-primary-light);
    background-color: var(--color-primary);
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

export default Pagination;
