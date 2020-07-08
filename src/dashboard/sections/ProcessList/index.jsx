import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../../api';
import { Table, Spinner, SectionTitle } from '../../../components/layoutPieces';
import { useAuth } from '../../../app/authContext';

const ProcessList = () => {
  const { user } = useAuth();
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    'Nº do Processo': 'docuNrExterno',
    Classe: 'classeDocumento',
    'Data Andamento': 'dtUltimoAndamento',
    'Rótulo Andamento': 'ultimoAndamento',
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessList(user);
        setProcessListData(response);
      } catch (e) {
        setLoading(true);
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
    <div className="processList-outer">
      <SectionTitle value="Processos Judiciais" glueToTop />
      {!processListData.length ? (
        <p className="paragraphWrapper"> Nenhum processo para exibir</p>
      ) : (
        <div className="processList-tableWrapper">
          <Table data={processListData} columns={tableColumns} showHeader />
        </div>
      )}
    </div>
  );
};

export default ProcessList;
