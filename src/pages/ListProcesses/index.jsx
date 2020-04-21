import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { Table, SectionTitle } from '../../components';
import { getUser } from '../../user';
// import TableProcesses from '../../components/TableProcesses';

const ListProcesses = () => {
  // eslint-disable-next-line no-shadow
  const [listProcesses, setListProcesses] = useState([]);

  // de-> para dos campos pros nomes das colunas
  const tableColumns = {
    MPRJ: 'docu_nr_mp',
    'Nº Externo': 'docu_nr_externo',
    'Último Andamento': 'dt_ultimo_andamento',
    Classe: 'classe_documento',
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getListProcesses(getUser());
      setListProcesses(response);
      // console.log('listProcesses', response);
    };
    loadData();
  }, []);

  if (!listProcesses) {
    return <div>loading</div>;
  }
  
  return (
    <div className="page-lista-processos">
      {/*<h3>Lista de processos</h3>*/}
      <SectionTitle value="Lista de Processos" />
      <div className="lista-processos">
        <Table data={listProcesses} columns={tableColumns} showHeader />
        {/*<TableProcesses list={listProcesses} data={data} />*/}
      </div>
    </div>
  );
};

export default ListProcesses;
