import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  totalPages: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

const Pagination = ({ totalPages, handlePageClick, currentPage }) => {
  return (
    <div className="mainPagination">
      <div className="btnPaginationItem">
        <button type="button" onClick={(e) => handlePageClick(currentPage - 1)}>
          lista anterior...
        </button>
        <div className="paginationItem">
          {currentPage}
          {' de '}
          {totalPages}
        </div>
        <button type="button" onClick={(e) => handlePageClick(currentPage + 1)}>
          ... próxima lista
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = propTypes;

export default Pagination;
