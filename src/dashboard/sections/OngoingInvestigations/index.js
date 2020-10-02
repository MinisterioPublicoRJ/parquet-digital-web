import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../../api';
import { CustomTable, Spinner, SectionTitle } from '../../../components';
import { useAuth } from '../../../app/authContext';
import ProcessList  from '../ProcessList';

const OngoingInvestigations = () => {
  const { buildRequestParams } = useAuth();
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextComponent, setnextComponent] = useState(0);
  
  const opacity = useState()

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrExterno',
    Personagens: 'docuPersonagens',
    Classe: 'classeDocumento',
    'Data Andamento': 'dtUltimoAndamento',
    'Rótulo Andamento': 'ultimoAndamento',
  };
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessList(buildRequestParams());
        setProcessListData(response);
      } catch (e) {
        setLoading(true);
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
  const pages = [{ display: 'none', component: <ProcessList />},];

  return (
    <div className="ongoingInvestigations-outer" >
      <button className="button-table-tutela" onClick={() => setnextComponent(nextComponent + 1)}>
        <SectionTitle value="Lista de investigações" glueToTop />
      </button>
      {!processListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="ongoingInvestigations-tableWrapper">
          <CustomTable data={processListData} columns={tableColumns} showHeader />
        </div>
      )}
    </div>
  );
};

export default OngoingInvestigations;
