import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { SectionTitle, AlertBadge } from '../../components';

function Alerts(props) {
  const mock = [
    {
      type: 'deadline',
      message: 'Há 01 procedimento preparatório com prazo próximo de vencer',
      link: 'http://localhost:3000/',
      actionCaption: 'Converter em inquérito civil',
      id: '2019.5679943',
    },
    {
      type: 'conclusion',
      message: 'O GATE finalizou a IT solicitada no procedimento 2018.00734577',
      link: null,
      actionCaption: null,
      id: '2018.00734577',
    },
    {
      type: 'deadline',
      message: 'O procedimento 2018.2228763 completará 01 ano em 09 dias!',
      link: 'http://localhost:3000/',
      actionCaption: 'Realizar uma prorrogação',
      id: '2018.2228763',
    },
    {
      type: 'decision',
      message: 'Você obteve uma decisão favorável no processo 002457.2017.8.19.0001',
      link: null,
      actionCaption: null,
      id: '002457.2017.8.19.0001',
    },
  ];
  return (
    <aside className="alertsWrapper">
      <div className="alertsHeader">
        <SectionTitle value="central de alertas" />
      </div>
      <div className="alertsBody">
        {mock.map(alert => (
          <AlertBadge
            type={alert.type}
            message={alert.message}
            action={alert.actionCaption}
            actionLink={alert.link}
          />
        ))}
      </div>
    </aside>
  );
}

export default Alerts;
