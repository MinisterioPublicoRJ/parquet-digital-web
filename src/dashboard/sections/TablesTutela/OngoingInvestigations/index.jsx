import React, { useState, useEffect, useRef } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner, Pagination } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const OngoingInvestigations = ({ isActive, setInvestigatedProfile, setProcessDetail, searchString }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [ongoingInvestigationsListData, setOngoingInvestigationsListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [page, setPage] = useState(1);
  const tableTopDivRef = useRef();

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Procedimento': 'docuNrMp',
    'Último Andamento': 'dtUltimoAndamento',
    Classe: 'classeDocumento',
    Investigados: 'docuPersonagens',
  };

  function handlePageClick(nextPage) {
    if (nextPage < 1 || nextPage > totalPages) return;

    if (tableTopDivRef.current) {
      tableTopDivRef.current.scrollIntoView();
    }
    setPage(nextPage);
  }

  function generateButtons(list) {
    return list.map((investigation) => {
      const { representanteDk, docuPersonagens, docuNrMp, docuNrExterno } = investigation;
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
      const processDetailBtn = docuNrMp ? (
        <button
          type="button"
          onClick={() => {
            setProcessDetail(docuNrMp, docuNrExterno);
          }}
          className="process-detail-btn"
        >
          {docuNrMp}
        </button>
      ) : (
        docuNrMp
      );
      return { ...investigation, docuPersonagens: investigatedNameBtn , docuNrMp: processDetailBtn};
    });
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getOngoingInvestigationsList(
          buildRequestParams(),
          page,
          searchString,
        );
        const buttonList = generateButtons(response.data);
        setOngoingInvestigationsListData(buttonList);
        setTotalPages(response.pages);
      } catch (e) {
        setOngoingInvestigationsListData(false);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalPages, searchString]);

  if (loading) {
    return <Spinner size="medium" />;
  }
  return (
    <div
      className={`${
        isActive
          ? 'ongoingInvestigations-outer ongoingInvestigations--active'
          : 'ongoingInvestigations-outer'
      }`}
    >
      {!ongoingInvestigationsListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="ongoingInvestigations-tableWrapper">
          <div className="investigated-table-top" ref={tableTopDivRef} />
          <CustomTable data={ongoingInvestigationsListData} columns={tableColumns} showHeader />
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

export default OngoingInvestigations;
