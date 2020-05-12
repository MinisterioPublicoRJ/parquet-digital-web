import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { Table, SectionTitle } from '../../components';
import { getUser } from '../../user';

const ProcessList = () => {
  // eslint-disable-next-line no-shadow
  const [processListData, setProcessListData] = useState([]);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    MPRJ: 'docu_nr_mp',
    'Nº Externo': 'docu_nr_externo',
    'Último Andamento': 'dt_ultimo_andamento',
    Classe: 'classe_documento',
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await Api.getProcessList(getUser());
        setProcessListData(response);
      } catch (e) {}
    };
    loadData();
  }, []);

  if (!processListData) {
    return <div>loading</div>;
  }
  return (
    <div className="processList-outer">
      <SectionTitle value="Lista de Processos" />
      <div className="processList-tableWrapper">
        <Table data={processListData} columns={tableColumns} showHeader />
      </div>
    </div>
  );
};

export default ProcessList;
