import React, { useState, useEffect } from 'react';

import './styles.css';
import Api from '../../api';
import { getUser } from '../../user';

const ListProcesses = () => {
  const [ListProcesses, setListProcesses] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const response = await Api.getListProcesses(getUser());
      setListProcesses(response);
      console.log(response);
    };
    loadData();
  }, []);
  return (
    <div className="page-lista-processos">
     <p>Tabela vem aqui</p>
    </div>
  );
};

export default ListProcesses;
