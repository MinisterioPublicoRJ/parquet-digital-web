import React, { useState } from 'react';
import './styles.css';

const Pagination = () => {
  const [atualPage, setatualPage] = useState(0);
  const [totalPage, setTotalPage] = useState(20);
  const [clickPage, setclickPage] = useState([]);

  return (
    <div className="mainPagination">
      <div className="btnPaginationItem">
        <button type="button">lista anterior...</button>
        <div className="paginationItem">19 20 21</div>
        <button type="button">... próxima lista</button>
      </div>
    </div>
  );
};

export default Pagination;
