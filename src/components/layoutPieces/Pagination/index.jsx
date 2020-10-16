import React, { useEffect, useState } from 'react';
import Api from '../../../api';
import { useAuth } from '../../../app/authContext';
import './styles.css';


const Pagination = () => {
  const { buildRequestParams } = useAuth();
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await Api.getOpenCasesList(buildRequestParams());
        console.log(response);
        setTotal(response);
      } catch (e) {
        setTotal(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mainPagination">
      <div className="btnPaginationItem">
        <button type="button">
          <span></span>
          <div>lista anterior...</div>
          <div className="paginationItem">19 20 21</div>
          <div>... próxima lista</div>
         <span></span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
