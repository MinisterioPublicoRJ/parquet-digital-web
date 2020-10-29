import React, { useState, useEffect } from 'react';
import Api from '../../../../api';
import { CustomTable, Spinner } from '../../../../components';
import { useAuth } from '../../../../app/authContext';

const OngoingInvestigations = ({ isActive, setInvestigatedProfile }) => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [ongoingInvestigationsListData, setOngoingInvestigationsListData] = useState([]);
  const [loading, setLoading] = useState(true);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrMp',
    'Último Andamento': 'dtUltimoAndamento',
    Classe: 'classeDocumento',
    Personagens: 'docuPersonagens',
  };

  function generateButtons(list) {
    return list.map((investigation) => {
      const { representanteDk, docuPersonagens } = investigation;
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
      return { ...investigation, docuPersonagens: investigatedNameBtn };
    });
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let response = await Api.getOngoingInvestigationsList(buildRequestParams());
        response = generateButtons(response);
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
        </div>
      )}
    </div>
  );
};

export default OngoingInvestigations;
