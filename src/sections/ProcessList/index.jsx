import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { Table, SectionTitle } from '../../components';
import { getUser } from '../../user';

const ProcessList = () => {
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);
  const [loading, setLoading] = useState(true);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    MPRJ: 'docu_nr_mp',
    'Nº Externo': 'docu_nr_externo',
    'Último Andamento': 'dt_ultimo_andamento',
    Classe: 'classe_documento',
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await Api.getProcessList(getUser());
        setProcessListData(response);
      } catch (e) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="processList-outer">
      <SectionTitle value="Últimos processos movimentados" />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="processList-tableWrapper">
          <Table data={processListData} columns={tableColumns} showHeader />
        </div>
      )}
    </div>
  );
};

export default ProcessList;
