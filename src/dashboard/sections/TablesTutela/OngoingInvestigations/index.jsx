import React, { useState, useEffect } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner, Pagination } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const OngoingInvestigations = ({ isActive }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [ongoingInvestigationsListData, setOngoingInvestigationsListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);



  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrMp',
    'Último Andamento': 'dtUltimoAndamento',
    Classe: 'classeDocumento',
    Personagens: 'docuPersonagens',
  };



  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getOngoingInvestigationsList(buildRequestParams());
        setOngoingInvestigationsListData(response);
      } catch (e) {
        setOngoingInvestigationsListData(false);
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
          <CustomTable data={ongoingInvestigationsListData} columns={tableColumns} showHeader />
          <Pagination />
        </div>
      )}
    </div>
  );
};

export default OngoingInvestigations;
