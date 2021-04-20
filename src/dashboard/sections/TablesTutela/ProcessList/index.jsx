import React, { useState, useEffect, useRef } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner, Pagination } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const ProcessList = ({ isActive, setInvestigatedProfile, setProcessDetail }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const tableTopDivRef = useRef();

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrExterno',
    Demandados: 'docuPersonagens',
    Classe: 'classeDocumento',
    'Último Andamento': 'dtUltimoAndamento',
    'Rótulo Andamento': 'ultimoAndamento',
  };

  function handlePageClick(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    if (tableTopDivRef.current) {
      tableTopDivRef.current.scrollIntoView();
    }
    setPage(nextPage);
  }

  function generateButtons(list) {
    return list.map((process) => {
      const { representanteDk, docuPersonagens, docuNrExterno, docuNrMp } = process;

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

      const processNumberBtn = (<button
        type="button"
        onClick={() => {
          setProcessDetail(docuNrMp);
        }}
        className="process-detail-btn"
      >
        {docuNrExterno}
      </button>)

      return { ...process, docuPersonagens: investigatedNameBtn, docuNrExterno: processNumberBtn };
    });
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessList(buildRequestParams(), page);
        const buttonList = generateButtons(response.data);
        setProcessListData(buttonList);
        setTotalPages(response.pages);
      } catch (e) {
        setProcessListData(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages]);

  if (loading) {
    return <Spinner size="medium" />;
  }

  return (
    <div className={`${isActive ? 'processList-outer processList--active' : 'processList-outer'}`}>
      {!processListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="processList-tableWrapper">
          <div className="investigated-table-top" ref={tableTopDivRef} />
          <CustomTable data={processListData} columns={tableColumns} showHeader />
          <Pagination
            totalPages={totalPages || 0}
            handlePageClick={(page) => handlePageClick(page)}
            currentPage={page}
          />
        </div>
      )}
    </div>
  );
};

export default ProcessList;
