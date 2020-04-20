import React, { useState, useEffect } from 'react';

import './styles.css';
import { getUser } from '../../user';
import Api from '../../api';
import { Spinner } from '..';
import { Table } from '../../components/layoutPieces/Table';

import TableProcesses from '../../components/TableProcesses';

const ListProcesses = () => {
  const [ListProcesses, setListProcesses] = useState({});

  const data = [
    {
      MPRJ: '2020.00096626',
      NºExterno: '00344195020198190204',
      ÚltimoAndamento: '22/12/2019',
      Classe: 'Inquérito Civil',
    },
    {
      MPRJ: '2020.00091121',
      NºExterno: '02577200620188190001',
      ÚltimoAndamento: '30/11/2019',
      Classe: 'Apelação',
    },
    {
      MPRJ: '2020.00096626',
      NºExterno: '00344195020198190204',
      ÚltimoAndamento: '22/12/2019',
      Classe: 'Inquérito Civil',
    },
    {
      MPRJ: '2020.00096626',
      NºExterno: '00344195020198190204',
      ÚltimoAndamento: '22/12/2019',
      Classe: 'Inquérito Civil',
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

  /*if (!ListProcesses) {
    return <div>loading</div>;
  }*/

  return (
    <div className="page-lista-processos">
      <h3>Lista de processos</h3>
      <div className="lista-processos">
        <TableProcesses data={data} />
      </div>
    </div>
  );
};

export default ListProcesses;
