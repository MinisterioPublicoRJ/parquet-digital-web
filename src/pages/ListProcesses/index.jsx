import React, { useState, useEffect } from 'react';

import './styles.css';
import { getUser } from '../../user';
import Api from '../../api';
import TableProcesses from '../../components/TableProcesses';

const ListProcesses = () => {
  // eslint-disable-next-line no-shadow
  const [listProcesses, setListProcesses] = useState([]);

  const data = [
    {
      MPRJ: '',
      NºExterno: '',
      ÚltimoAndamento: '',
      Classe: '',
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getListProcesses(getUser());
      setListProcesses(response);
      console.log(response);
    };
    loadData();
  }, []);

  if (!ListProcesses) {
    return <div>loading</div>;
  }
  return (
    <div className="page-lista-processos">
      <h3>Lista de processos</h3>
      <div className="lista-processos">
        <TableProcesses list={listProcesses} data={data} />
      </div>
    </div>
  );
};

export default ListProcesses;
