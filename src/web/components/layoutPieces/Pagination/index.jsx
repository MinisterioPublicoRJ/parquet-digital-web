import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  totalPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

const Pagination = ({ totalPages, handlePageClick, currentPage }) => {
  function renderPageNumberButtons() {
    let firstButtonNumber = 1;
    if (currentPage > 3) firstButtonNumber = currentPage - 2;
    if (currentPage + 2 > totalPages && totalPages > 5) firstButtonNumber = totalPages - 4;
    if (firstButtonNumber < 1) firstButtonNumber = 1;

    const buttonNumbers = [];
    for (let i = firstButtonNumber; i < firstButtonNumber + 5 && i <= totalPages; i++) {
      buttonNumbers.push(i);
    }

    const buttons = buttonNumbers.map((number) => (
      <button
        key={number}
        type="button"
        className={`pagination-number-button ${currentPage === number ? 'active' : ''}`}
        onClick={(e) => handlePageClick(number)}
      >
        {number}
      </button>
    ));
    return buttons;
  }

  return (
    <div className="mainPagination">
      <div className="btnPaginationItem">
        {currentPage > 1 ? (
          <button type="button" onClick={(e) => handlePageClick(currentPage - 1)}>
            lista anterior...
          </button>
        ) : null}

        <div className="paginationItem">{renderPageNumberButtons()}</div>

        {currentPage < totalPages ? (
          <button type="button" onClick={(e) => handlePageClick(currentPage + 1)}>
            ... próxima lista
          </button>
        ) : null}
      </div>
    </div>
  );
};

Pagination.propTypes = propTypes;

export default Pagination;
