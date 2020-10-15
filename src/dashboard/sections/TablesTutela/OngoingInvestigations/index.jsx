import React, { useState, useEffect } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const OngoingInvestigations = ({ isActive }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [OngoingInvestigationsListData, setOngoingInvestigationsListData] = useState([]);
  const [loading, setLoading] = useState(true);


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
      {!OngoingInvestigationsListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="ongoingInvestigations-tableWrapper">
          <CustomTable data={OngoingInvestigationsListData} columns={tableColumns} showHeader />
        </div>
      )}
    </div>
  );
};

export default OngoingInvestigations;
