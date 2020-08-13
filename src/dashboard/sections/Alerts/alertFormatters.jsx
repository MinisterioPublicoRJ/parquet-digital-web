import React from 'react';

import {
  ClockIcon,
  CorujaGate,
  Home,
  Ouvidoria,
  Va,
  Tjrj,
  IconContratacoes,
} from '../../../assets';
import { NOT_GROUPABLE_ALERTS } from './alertsConstants';

/**
 * Finds the details for each alert type
 * @param  {json} alert {alertCode}
 * @return {json}       { icon: node, message: node, action: null, actionLink: null, background: string }
 */
export function cleanAlert(alert) {
  const key = alert.count
    ? `${alert.alertCode}-${alert.count}`
    : `${alert.alertCode}-${alert.docNum}` &&
      `${alert.alertCode}-${alert.contrato}` &&
      `${alert.alertCode}-${alert.item}`;

  let icon = null;
  let message = null;
  let background = null;
  let compId = null;
  // not implemented yet
  const action = true;
  const actionLink = alert.alertCode;
  const single = alert.count ? alert.count === 1 : true;

  // prettier-ignore
  switch (alert.alertCode) {
    // ALERTAS DA TUTELA
    case 'DCTJ':
      icon = <Tjrj />;
      message = (
        <span>
          Há
          <strong>{` ${` ${alert.count} `} `}</strong>
          {`${single ? 'processo criminal' : 'processos criminais'} no TJRJ há `}
          <strong>mais de 60 dias</strong>
          sem retorno.
        </span>
      );
      background = '#F86C72';
      break;

    case 'DNTJ':
      icon = <Tjrj />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} `}</strong>
          {`${single ? 'processo não criminal': 'processos não criminais'} no TJRJ há `}
          <strong>há mais de 120 dias</strong>
          sem retorno.
        </span>
      );
      background = '#F86C72';
      break;

    case 'MVVD':
      icon = <Ouvidoria />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} ${single ? 'processo' : 'processos'} `}</strong>
          com
          <strong> vitimas recorrentes </strong>
          de
          <strong> violência domestica.</strong>
        </span>
      );
      background = '#F86C72';
      break;

    case 'PA1A':
      icon = <ClockIcon />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} `}</strong>
          <strong>{`${single ? 'processo administrativo aberto' : 'processos administrativos abertos'} há mais de 1 ano`}</strong>
          .
        </span>
      );
      background = '#5C6FD9';
      break;

    case 'PPFP':
      icon = <ClockIcon />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} ${single ? 'procedimento preparatório' : 'procedimentos preparatórios'} `}</strong>
          com
          <strong> prazo de tratamento esgotado.</strong>
        </span>
      );
      background = '#f86c72';
      break;

    case 'IC1A':
      icon = <ClockIcon />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} ${single ? 'inquérito civil' : 'inquéritos civis'} `}</strong>
          {single ? 'ativo ' : 'ativos '}
          <strong> sem prorrogação </strong>
          há
          <strong> mais de 1 ano</strong>
          .
        </span>
      );
      background = '#f86c72';
      break;

    case 'NF30':
      icon = <ClockIcon />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} `}</strong>
          {single ? 'notícia de fato autuada há mais de' : 'notícias de fato autuadas há mais de'}
          <strong> 120 dias </strong>
          {single ? 'que ainda está' : 'que ainda estão'}
          <strong> sem tratamento.</strong>
        </span>
      );
      background = '#f86c72';
      break;

    case 'OFFP':
      icon = <ClockIcon />;
      message = (
        <span>
          Há
          <strong>{` ${alert.count} ${single ? 'ofício' : 'ofícios'} `}</strong>
          com
          <strong> prazo de apreciação esgotado</strong>
          .
        </span>
      );
      background = '#f86c72';
      break;

    case 'OUVI':
      icon = <Ouvidoria />;
      message = (
        <span>
          <strong>{`Há ${alert.count} ${single ? 'expediente' : 'expedientes'} de Ouvidoria `}</strong>
          {single ? 'enviado porém' : 'enviados porém'}
          <strong>{` não ${single ? 'recebido' : 'recebidos'}.`}</strong>
        </span>
      );
      background = '#5C6FD9';
      break;

    case 'VADF':
      icon = <Va />;
      message = (
        <span>
          Você tem
          <strong>{` ${alert.count} ${single ? 'vista aberta' : 'vistas abertas'} `}</strong>
          em
          <strong>{` ${single ? 'documento' : 'documentos'} sinalizados como ${single ? 'fechado' : 'fechados'}.`}</strong>
        </span>
      );
      background = '#28A7E0';
      break;

    // ALERTAS DE COMPRAS
    case 'COMP':
      icon = <IconContratacoes />;
      message = (
        <span>
          Os valores do contrato
          <strong>{` ${` ${alert.contrato} `} `}</strong>
          ,
          itens:
          <strong>{` ${` ${alert.item.substring(0,40).toLowerCase()}... `} `}</strong>
          merecem sua atenção.
        </span>
        );
        background = '#F8BD6C';
        compId = alert.contrato_iditem;
        break;

    // ALERTAS DE PRESCRIÇÃO
    case 'PRCR':
      icon = <ClockIcon />;
      message = (
        <span>
          O procedimento <strong>{`${alert.docNum}`}</strong>
          tem um 
          <strong> crime </strong>
          possivelmente 
          <strong> prescrito </strong>
          .
        </span>
        );
        background = '#F86C72';
        break;


    // ALERTAS DA PIP
    case 'GATE':
      icon = <CorujaGate />;
      message = (
        <span>
          O
          <strong> Gate </strong>
          finalizou a
          <strong> IT </strong>
          solicitada no procedimento
          <strong>{` ${alert.docNum}.`}</strong>
        </span>
      );
      background = '#374354';
      break;

    case 'DT2I':
      icon = <Home />;
      message = (
        <span>
          <strong>{`Há ${alert.count} ${single ? 'movimentação' : 'movimentações'} `}</strong>
          em processo desta promotoria na
          <strong> segunda instância.</strong>
        </span>
      );
      background = '#5C6FD9';
      break;

    default:
      break;
  }

  return { icon, message, action, actionLink, background, key , compId};
}

export function cleanAlertList(list, countList) {
  const orderedTypes = Object.keys(countList);
  const cleanList = [];

  orderedTypes.forEach(type => {
    const isGroupable = NOT_GROUPABLE_ALERTS.indexOf(type) === -1;
    if (isGroupable) {
      cleanList.push(cleanAlert({ alertCode: type, count: countList[type].count }));
    } else {
      const allAlertsOfType = list
        .filter(alert => alert.alertCode === type)
        .map(alert => cleanAlert(alert));
      cleanList.push(...allAlertsOfType);
    }
  });

  return cleanList;
}
