/* eslint-disable */

import React from 'react';

import {
  ClockIcon,
  CorujaGate,
  // Home,
  Ouvidoria,
  Va,
  Tjrj,
  IconContratacoes,
} from '../../../../assets';

import { DELETE, COMPRAS, OUVIDORIA, IT, CALCULO, DETAIL, GENERATE_DOC } from './actionConstants';

/**
 * Finds the details for each alert type
 * @param  {json} alert {alertCode}
 * @return {json}       {
 *  actions: array of action objects, see actionConstants for more,
 *  backgroundColor: string }
 *  icon: node,
 *  key: string,
 *  message: node,
 * }
 */
export default function individualAlertFormatter(alert) {
  // prettier-ignore
  switch (alert.alertCode) {
    // ALERTAS DA TUTELA
    case 'DCTJ':
    return dctjConstructor(alert);

    case 'DNTJ':
    return dntjConstructor(alert);

    case 'MVVD':
    return mvvdConstructor(alert);

    case 'PA1A':
    return pa1aConstructor(alert);

    case 'PPFP':
    return ppfpConstructor(alert);

    case 'IC1A':
    return ic1aConstructor(alert);

    case 'NF30':
      return nf30Constructor(alert);

    case 'OFFP':
    return offpConstructor(alert);

    case 'OUVI':
    return ouviConstructor(alert);

    case 'VADF':
    return vadfConstructor(alert);

    // ALERTAS DE COMPRAS
    case 'COMP':
      return compConstructor(alert);

    // ALERTAS DE PRESCRIÇÃO
    case 'PRCR':
      return prcrConstructor(alert);

    // ALERTAS DA PIP
    case 'GATE':
    return gateConstructor(alert);

    case 'DT2I':
      return dt2iConstructor(alert);

    default:
      return {};
  }
}

function compConstructor(alert) {
  const { contrato_iditem, contrato, item, iditem, dropdown, alertCode } = alert;
  console.log('alert', alert);
  let key;
  let message;
  let actions;

  if (dropdown) {
    actions = [];
    key = `${alertCode}-dropdown`;
    message = <span>{`Placedolher mensagem dropdown ${alertCode}`}</span>;
  } else {
    key = `${contrato}-${iditem}`;
    actions = [OUVIDORIA(contrato_iditem, contrato), COMPRAS(), DELETE];
    message = (
      <span>
        Os valores do contrato
        <strong>{` ${contrato} `}</strong>, itens:
        <strong>{` ${item.substring(0, 40).toLowerCase()}... `}</strong>
        merecem sua atenção.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#F8BD6C',
    icon: <IconContratacoes />,
    key,
    message,
  };
}

function dctjConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong> {`${count}`} </strong>
        {`${single ? 'processo criminal' : 'processos criminais'} no TJRJ há `}
        <strong> mais de 60 dias </strong>
        sem retorno.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O processo criminal
        <strong>{`${docNum}`}</strong>
        está há
        <strong> mais de 60 dias </strong>
        no TJRJ sem retorno
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#F86C72',
    icon: <Tjrj />,
    key,
    message,
  };
}

function dntjConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} `}</strong>
        {`${single ? 'processo não criminal' : 'processos não criminais'} no TJRJ há `}
        <strong> há mais de 120 dias </strong>
        sem retorno.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O processo criminal
        <strong>{`${docNum}`}</strong>
        está há
        <strong> mais de 120 dias </strong>
        no TJRJ sem retorno
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#F86C72',
    icon: <Tjrj />,
    key,
    message,
  };
}

function mvvdConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} ${single ? 'processo' : 'processos'} `}</strong>
        com
        <strong> vitimas recorrentes </strong>
        de
        <strong> violência domestica.</strong>
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O processo{``}
        <strong>{`${docNum}`}</strong>
        possui
        <strong> vitimas recorrentes </strong>
        de
        <strong> violência domestica.</strong>
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#F86C72',
    icon: <Ouvidoria />,
    key,
    message,
  };
}

function pa1aConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} `}</strong>
        <strong>{`${
          single ? 'processo administrativo aberto' : 'processos administrativos abertos'
        } há mais de 1 ano`}</strong>
        .
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O processo administrativo{``}
        <strong>{`${docNum}`}</strong>
        está aberto
        <strong> há mais de um ano</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#5C6FD9',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function ppfpConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} ${
          single ? 'procedimento preparatório' : 'procedimentos preparatórios'
        } `}</strong>
        com
        <strong> prazo de tratamento esgotado.</strong>
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O procedimento preparatório {``}
        <strong>{`${docNum}`}</strong> {``}
        está com o<strong> prazo de tratamento esgotado</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function ic1aConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} ${single ? 'inquérito civil' : 'inquéritos civis'} `}</strong>
        {single ? 'ativo ' : 'ativos '}
        <strong> sem prorrogação </strong>
        há
        <strong> mais de 1 ano</strong>.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O inquérito civil
        <strong>{` ${docNum} `}</strong>
        está sem prorrogação há
        <strong> mais de 1 ano</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function nf30Constructor({ dropdown, alertCode, count, docNum, date }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} `}</strong>
        {single ? 'notícia de fato autuada há mais de' : 'notícias de fato autuadas há mais de'}
        <strong> 120 dias </strong>
        {single ? 'que ainda está' : 'que ainda estão'}
        <strong> sem tratamento</strong>.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}-${date ? date.getTime() : 'teste'}`;
    message = (
      <span>
        A notícia de fato autuada há mais de 120 dias
        <strong>{` ${docNum} `}</strong>
        ainda está
        <strong> sem tratamento</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function offpConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} ${single ? 'ofício' : 'ofícios'} `}</strong>
        com
        <strong> prazo de apreciação esgotado</strong>.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O ofício
        <strong>{` ${alert.docNum} `}</strong>
        está com o<strong> prazo de apreciação esgotado</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function ouviConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        <strong>{`Há ${count} ${single ? 'expediente' : 'expedientes'} de Ouvidoria `}</strong>
        {single ? 'enviado porém' : 'enviados porém'}
        <strong>{` não ${single ? 'recebido' : 'recebidos'}`}</strong>.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        A ouvidoria
        <strong>{` ${docNum} `}</strong>
        foi enviada porém
        <strong> não foi recebida</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#5C6FD9',
    icon: <Ouvidoria />,
    key,
    message,
  };
}

function vadfConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Você tem
        <strong>{` ${count} ${single ? 'vista aberta' : 'vistas abertas'} `}</strong>
        em
        <strong>{` ${single ? 'documento' : 'documentos'} sinalizados como ${
          single ? 'fechado' : 'fechados'
        }.`}</strong>
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        Você possui
        <strong> vista aberta </strong>
        para o documento
        <strong>{` ${docNum} `}</strong>
        <strong> sinalizado como fechado</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#28A7E0',
    icon: <Va />,
    key,
    message,
  };
}

function prcrConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = <span>{`Placedolher mensagem dropdown ${alertCode}`}</span>;
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O procedimento
        <strong>{` ${docNum} `}</strong>
        tem um
        <strong> crime </strong>
        possivelmente
        <strong> prescrito </strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#F86C72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function gateConstructor({ dropdown, alertCode, count, docNum, docDk }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = <span>{`Placedolher mensagem dropdown ${alertCode}`}</span>;
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O<strong> Gate </strong>
        finalizou a<strong> IT </strong>
        solicitada no procedimento
        <strong>{` ${docNum}`}</strong>.
      </span>
    );
  }

  return {
    actions: [IT(`http://apps.mprj.mp.br/gate/api/Cidadao/downloadPDF/${docDk}`), DELETE],
    backgroundColor: '#374354',
    icon: <CorujaGate />,
    key,
    message,
  };
}

function dt2iConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        <strong>{`Há ${count} ${single ? 'movimentação' : 'movimentações'} `}</strong>
        em processo desta promotoria na
        <strong> segunda instância.</strong>
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O procedimento
        <strong>{` ${docNum}`}</strong> {``}
        possui {``}
        <strong> movimentações em segunda instância</strong>.
      </span>
    );
  }

  return {
    actions: [DELETE],
    backgroundColor: '#374354',
    icon: <CorujaGate />,
    key,
    message,
  };
}
