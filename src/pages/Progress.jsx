import React from 'react';
import './styles.css'

import { Table } from '../components';

export default function() {
  const mock = [
    {
      numero_mprj: '201701058968',
      numero_externo: '',
      dt_abertura: '2018-12-14',
      classe: 'COMUNICAÇÃO',
    },
    {
      numero_mprj: '201701058956',
      numero_externo: '',
      dt_abertura: '2019-10-14',
      classe: 'inquerito civil',
    },
    {
      numero_mprj: '201701056549',
      numero_externo: '',
      dt_abertura: '2020-08-06',
      classe: 'apelação',
    },
    {
      numero_mprj: '201701057531',
      numero_externo: '',
      dt_abertura: '2016-02-31',
      classe: 'notícia de fato',
    },
  ];
  const categories = {
    MPRJ: 'numero_mprj',
    'Nº Externo': 'numero_externo',
    'Último Andamento': 'dt_abertura',
    Classe: 'classe',
  };
  return (
    <article className="page">
      <Table data={mock} columns={categories} showHeader />
    </article>
  );
}
