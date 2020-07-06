import React from 'react';

import { ClockIcon, CorujaGate, Home, Ouvidoria, Va, Tjrj } from '../../../assets';
import { NOT_GROUPABLE_ALERTS } from './alertsConstants';

export function cleanAlertList(list, countList) {
  const orderedTypes = Object.keys(countList);
  const cleanList = [];

  orderedTypes.forEach(type => {
    const isGroupable = NOT_GROUPABLE_ALERTS.indexOf(type) === -1;
    if (isGroupable) {
      cleanList.push(cleanAlert({ alertCode: type, count: countList[type].count }));
    } else {
      cleanList.concat(
        list.filter(alert => alert.alertCode === type).map(alert => cleanAlert(alert)),
      );
    }
  });

  return cleanList;
}

/**
 * Finds the details for each alert type
 * @param  {json} alert {alertCode}
 * @return {json}       { icon: node, message: node, action: null, actionLink: null, background: string }
 */
export function cleanAlert(alert) {
  const key = alert.count
    ? `${alert.alertCode}-${alert.count}`
    : `${alert.alertCode}-${alert.docNum}`;
  let icon = null;
  let message = null;
  let background = null;
  // not implemented yet
  const action = null;
  const actionLink = null;

  switch (alert.alertCode) {
    // ALERTAS DA TUTELA
    case 'DCTJ':
      icon = <Tjrj />;
      message = (
        <span>
          Há <strong> {` ${` ${alert.count} `} `}</strong> processos criminais no TJRJ há{' '}
          <strong>mais de 60 dias</strong> sem retorno.
        </span>
      );
      background = '#F86C72';
      break;

    case 'DNTJ':
      icon = <Tjrj />;
      message = (
        <span>
          Há <strong> {` ${alert.count} `}</strong> processos não criminais no TJRJ há{' '}
          <strong>há mais de 120 dias</strong> sem retorno.
        </span>
      );
      background = '#F86C72';
      break;

    case 'MVVD':
      icon = <Ouvidoria />;
      message = (
        <span>
          Há <strong> {` ${alert.count} `} processos</strong> com{' '}
          <strong> vitimas recorrentes</strong> de<strong> violência domestica </strong>.
        </span>
      );
      background = '#F86C72';
      break;

    case 'PA1A':
      icon = <ClockIcon />;
      message = (
        <span>
          Há <strong>
{' '}
{` ${alert.count} `}
{' '}
 </strong>
{' '}
          <strong> processos administrativos abertos há mais de 1 ano</strong>.
        </span>
      );
      background = '#5C6FD9';
      break;

    case 'PPFP':
      icon = <ClockIcon />;
      message = (
        <span>
          Há <strong> {` ${alert.count} `}</strong> <strong> procedimentos preparatório </strong>
{' '}
          com <strong> prazo de tratamento esgotado.</strong>
        </span>
      );
      background = '#f86c72';
      break;

    case 'IC1A':
      icon = <ClockIcon />;
      message = (
        <span>
          Há <strong> {` ${alert.count} `} </strong> <strong> inquéritos civil </strong> ativo{' '}
          <strong> sem prorrogação </strong> há<strong> mais de 1 ano</strong>.
        </span>
      );
      background = '#f86c72';
      break;

    case 'NF30':
      icon = <ClockIcon />;
      message = (
        <span>
          Há <strong> {` ${alert.count} `}</strong> notícias de fato autuada há mais de{' '}
          <strong>120 dias</strong> e ainda está
          <strong>sem tratamento</strong>
        </span>
      );
      background = '#f86c72';
      break;

    case 'OFFP':
      icon = <ClockIcon />;
      message = (
        <span>
          Há <strong>{` ${alert.count} `} oficios</strong> com{' '}
          <strong> prazo de apreciação esgotado </strong>.
        </span>
      );
      background = '#f86c72';
      break;

    case 'OUVI':
      icon = <Ouvidoria />;
      message = (
        <span>
          <strong> {` ${alert.count} `}</strong> <strong> Expediente </strong> de{' '}
          <strong> Ouvidoria </strong> enviado porém
          <strong> não recebido</strong>
        </span>
      );
      background = '#5C6FD9';
      break;

    case 'VADF':
      icon = <Va />;
      message = (
        <span>
          Você tem <strong> {` ${alert.count} `} vistas abertas </strong> em{' '}
          <strong> documentos sinalizados como fechado</strong>
        </span>
      );
      background = '#28A7E0';
      break;

    // ALERTAS DA PIP
    case 'GATE':
      icon = <CorujaGate />;
      message = (
        <span>
          O <strong>Gate </strong>finalizou a <strong>IT</strong> solicitada no procedimento{' '}
          <strong>{` ${alert.docNum} `}</strong>
        </span>
      );
      background = '#374354';
      break;

    case 'DT2I':
      icon = <Home />;
      message = (
        <span>
          <strong> {` ${alert.count} `} movimentações </strong> em processo desta promotoria na
          <strong> segunda instância </strong>
        </span>
      );
      background = '#5C6FD9';
      break;

    default:
      break;
  }

  return { icon, message, action, actionLink, background, key };
}
