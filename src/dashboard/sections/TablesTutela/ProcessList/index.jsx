import React, { useState, useEffect } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner, Pagination } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const ProcessList = ({ isActive, setInvestigatedProfile }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrExterno',
    Investigados: 'docuPersonagens',
    Classe: 'classeDocumento',
    'Último Andamento': 'dtUltimoAndamento',
    'Rótulo Andamento': 'ultimoAndamento',
  };

  function handlePageClick(page) {
    if (page < 1 || page > totalPages)
    return totalPages;

  }
  function generateButtons(list) {
    return list.map((process) => {
      const { representanteDk, docuPersonagens } = process;
      const investigatedNameBtn = representanteDk ? (
        <button
          type="button"
          onClick={() => {
            setInvestigatedProfile(representanteDk);
          }}
          className="investigated-profile-btn"
        >
          {docuPersonagens}
        </button>
      ) : (
        docuPersonagens
      );
      return { ...process, docuPersonagens: investigatedNameBtn };
    });
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let response = await Api.getProcessList(buildRequestParams());
        console.log(response)
        // response = generateButtons(response);
        setProcessListData(response.data);
        //setTotalPages(response.length);
      } catch (e) {
        setProcessListData(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Spinner size="medium" />;
  }

  return (
    <div className={`${isActive ? 'processList-outer processList--active' : 'processList-outer'}`}>
      {!processListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="processList-tableWrapper">
          <CustomTable data={processListData} columns={tableColumns} showHeader />
          <Pagination
            totalPages={totalPages || 0}
            handlePageClick={(page) => handlePageClick(page)}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProcessList;
