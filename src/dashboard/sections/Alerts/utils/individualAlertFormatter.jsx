/* eslint-disable */

import React from 'react';

import {
  ClockIcon,
  CorujaGate,
  Home,
  Ouvidoria,
  IconVd,
  Va,
  Tjrj,
  IconContratacoes,
  Ro,
} from '../../../../assets';

import {
  PRCR_ACTION_GENERATE_DOC,
  COMPRAS_ACTION_OUVIDORIA,
  IC1A_ACTION_GENERATE_DOC,
  PPFP_ACTION_EXTEND,
  PPFP_ACTION_CONVERT,
  PPPV_ACTION_EXTEND,
  PPPV_ACTION_CONVERT,
  UNSENT_OCCURRENCE_LIST,
  ABR1_ALERT_ACTION,
} from '../../../../api/endpoints';

import {
  DELETE,
  COMPRAS,
  OUVIDORIA_ISPS,
  SANEAMENTO,
  OUVIDORIA_COMPRAS,
  IT,
  CALCULO,
  DETAIL,
  GENERATE_DOC,
  GENERATE_MINUTA,
  EXTEND_DEADLINE,
  DOWNLOAD_LIST,
} from './actionConstants';

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
export default function individualAlertFormatter(alert, cpf, token, orgao) {
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
    return ppfpConstructor(alert, cpf, token);

    case 'PPPV':
      return pppvConstructor(alert,cpf, token);

    case 'IC1A':
    return ic1aConstructor(alert, cpf, token);

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
      return compConstructor(alert, orgao, token);

    case 'ISPS':
      return ispsConstructor(alert);

    case 'RO':
      return roOccurrence(alert, token);

    case 'ABR1':
      return abr1Constructor(alert,cpf, token);
  
    // ALERTAS DE PRESCRIÇÃO
    case 'PRCR':
    case 'PRCR1':
    case 'PRCR2':
    case 'PRCR3':
    case 'PRCR4':
      return prcrConstructor(alert, cpf, token);

    // ALERTAS DA PIP
    case 'GATE':
      return gateConstructor(alert);

    case 'DT2I':
      return dt2iConstructor(alert);

    case 'CTAC':
      return ctacConstructor(alert);

    default:
      return {};
  }
}

function compConstructor(alert, orgao, token) {
  const { contrato_iditem, contrato, item, iditem, dropdown, alertCode, count } = alert;
  let key;
  let message;
  let actions;

  if (dropdown) {
    actions = [];
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        <strong> {`${count}`} </strong>
        {`${single ? 'compra' : 'compras'}`} <strong>suspeitas</strong> foram verificadas em
        contratos públicos
      </span>
    );
  } else {
    key = `${contrato}-${iditem}`;
    actions = [
      OUVIDORIA_COMPRAS(COMPRAS_ACTION_OUVIDORIA({ alertId: contrato_iditem, orgao, token })),
      COMPRAS({ compId: contrato_iditem, contrato }),
      DELETE,
    ];
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

function ispsConstructor(alert) {
  const { indicador_iditem, indicador, item, iditem, dropdown, alertCode, count } = alert;
  let key;
  let message;
  let actions;

  if (dropdown) {
    actions = [];
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        <strong> {`${count}`} </strong>
        {`${single ? 'indicador' : 'indicadores'}`} de saneamento estão em
        <strong> vermelho </strong> nesta cidade
      </span>
    );
  } else {
    key = `${indicador}-${iditem}`;
    actions = [OUVIDORIA_ISPS(), SANEAMENTO({ compId: indicador_iditem, indicador }), DELETE];
    message = (
      <span>
        Os valores do indicador <strong>{` ${indicador} `}</strong>
        nesta cidade merecem sua atenção.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#71D0A4',
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
        {`${single ? 'procedimento criminal' : 'procedimentos criminais'} no TJRJ há `}
        <strong> mais de 60 dias </strong>
        sem retorno.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O procedimento criminal
        <strong>{`${docNum}`}</strong>
        está há
        <strong> mais de 60 dias </strong>
        no TJRJ sem retorno
      </span>
    );
  }

  return {
    actions: [DETAIL(), DELETE],
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
        {`${single ? 'procedimento não criminal' : 'procedimentos não criminais'} no TJRJ há `}
        <strong> há mais de 120 dias </strong>
        sem retorno.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O procedimento criminal
        <strong>{`${docNum}`}</strong>
        está há
        <strong> mais de 120 dias </strong>
        no TJRJ sem retorno
      </span>
    );
  }

  return {
    actions: [DETAIL(), DELETE],
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
        <strong>{` ${count} ${single ? 'procedimento' : 'procedimentos'} `}</strong>
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
        O procedimento {``}
        <strong>{`${docNum}`}</strong> {``}
        possui
        <strong> vitimas recorrentes </strong>
        de
        <strong> violência domestica.</strong>
      </span>
    );
  }

  return {
    actions: [DETAIL(), DELETE],
    backgroundColor: '#F86C72',
    icon: <IconVd />,
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
          single ? 'procedimento administrativo aberto' : 'procedimentos administrativos abertos'
        } há mais de 1 ano`}</strong>
        .
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        O procedimento administrativo{``}
        <strong>{`${docNum}`}</strong>
        está aberto
        <strong> há mais de um ano</strong>.
      </span>
    );
  }

  return {
    actions: [GENERATE_DOC(), CALCULO(), DELETE],
    backgroundColor: '#5C6FD9',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function ic1aConstructor({ dropdown, alertCode, count, docNum, orgao, docDk }, cpf, token) {
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
    actions: [
      GENERATE_DOC(IC1A_ACTION_GENERATE_DOC({ orgao, cpf, docDk, token })),
      CALCULO(),
      DELETE,
    ],
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
    actions: [DETAIL(), DELETE],
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
        <strong>{` ${docNum} `}</strong>
        está com o<strong> prazo de apreciação esgotado</strong>.
      </span>
    );
  }

  return {
    actions: [DETAIL(), DELETE],
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function ouviConstructor(alert) {
  const { dropdown, alertCode, count, docNum } = alert;

  let key;
  let message;
  let actions = [];

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
    actions = [DETAIL(), DELETE];
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
    actions,
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
    actions: [DETAIL(), DELETE],
    backgroundColor: '#28A7E0',
    icon: <Va />,
    key,
    message,
  };
}

function prcrConstructor({ dropdown, alertCode, count, docNum, orgao, docDk }, cpf, token) {
  let key;
  let message;
  let actions;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    actions = [];
    const single = count === 1;

    switch (alertCode) {
      case 'PRCR1':
        message = (
          <span>
            <strong>{`Há ${count} `}</strong>
            {single ? ' procedimento ' : ' procedimentos '}
            com todos os seus
            <strong> crimes </strong>
            possivelmente
            <strong> prescritos </strong>
          </span>
        );
        break;
      case 'PRCR2':
        message = (
          <span>
            <strong>{`Há ${count} `}</strong>
            {single ? ' procedimento ' : ' procedimentos '}
            em que todos os crimes
            <strong> prescreverão </strong>
            em menos de
            <strong> 90 dias </strong>
          </span>
        );
        break;
      case 'PRCR3':
        message = (
          <span>
            <strong>{`Há ${count} `}</strong>
            {single ? ' procedimento ' : ' procedimentos '}
            com ao menos um crime
            <strong> possivelmente prescrito. </strong>
          </span>
        );
        break;
      case 'PRCR4':
        message = (
          <span>
            <strong>{`Há ${count} `}</strong>
            {single ? ' procedimento ' : ' procedimentos '}
            com um crime que
            <strong> possivelmente prescreverá. </strong>
            em
            <strong> menos de 90 dias. </strong>
          </span>
        );
        break;
      default:
        message = (
          <span>
            <strong>{`Há ${count} `}</strong>
            {single ? ' procedimento ' : 'procedimentos '} de responsabilidade dessa promotoria com
            algum <strong> crime possivelmente prescrito</strong>
          </span>
        );
    }
  } else {
    key = `${alertCode}-${docNum}`;
    actions = [DETAIL(), DELETE];

    switch (alertCode) {
      case 'PRCR1':
        actions = [
          GENERATE_DOC(PRCR_ACTION_GENERATE_DOC({ orgao, cpf, docDk, token })),
          CALCULO(),
          DELETE,
        ];
        message = (
          <span>
            O procedimento
            <strong>{` ${docNum} `}</strong>
            tem
            <strong> todos </strong>
            os seus
            <strong> crimes </strong>
            possivelmente
            <strong> prescritos.</strong>
          </span>
        );
        break;
      case 'PRCR2':
        message = (
          <span>
            <strong>Todos os crimes </strong>
            do procedimento
            <strong>{` ${docNum} `}</strong>
            possivelmente
            <strong> prescreverão </strong>
            em menos de
            <strong> 90 dias </strong>
          </span>
        );
        break;
      case 'PRCR3':
        message = (
          <span>
            O procedimento
            <strong>{` ${docNum} `}</strong>
            tem pelo menos um
            <strong> crime </strong>
            possivelmente
            <strong> prescrito. </strong>
          </span>
        );
        break;
      case 'PRCR4':
        message = (
          <span>
            {' '}
            O procedimento
            <strong>{` ${docNum} `}</strong>
            tem um
            <strong> crime </strong>
            que possivelmente
            <strong> prescreverá em </strong>
            menos de
            <strong> 90 dias. </strong>
          </span>
        );
        break;
      default:
        actions = [
          GENERATE_DOC(PRCR_ACTION_GENERATE_DOC({ orgao, cpf, docDk, token })),
          CALCULO(),
          DELETE,
        ];
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
  }

  return {
    actions,
    backgroundColor: '#F86C72',
    icon: <ClockIcon />,
    key,
    message,
    docDk,
  };
}

function gateConstructor(alert) {
  const { dropdown, alertCode, count, docNum, alertId } = alert;
  let key;
  let message;
  let actions = [];

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        O<strong> GATE </strong> finalizou <strong>{`${count} ${single ? 'IT' : 'ITs'} `}</strong>
        em procedimentos desta promotoria de justiça.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}-${alertId}`;
    actions = [IT({ alertId: alertId }), DELETE];
    message = (
      <span>
        O<strong> GATE </strong>
        finalizou a<strong> IT </strong>
        solicitada no procedimento
        <strong>{` ${docNum}`}</strong>.
      </span>
    );
  }

  return {
    actions,
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
        em procedimento desta promotoria na
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
    actions: [DETAIL(), DELETE],
    backgroundColor: '#5C6FD9',
    icon: <Home />,
    key,
    message,
  };
}

function roOccurrence(alert, token) {
  const { dropdown, alertCode, count, daysPassed, alertId } = alert;
  const dpNumber = alertId;
  const unsentOcurrences = daysPassed;
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        Há <strong>{` ${count} ${single ? 'DP' : 'DPs'} `}</strong>
        da sua região com registros de ocorrência que não chegaram no MPRJ
      </span>
    );
  } else {
    key = `${alertCode}-${alertId}`;
    const single = unsentOcurrences === 1;
    message = (
      <span>
        <strong>{` ${unsentOcurrences} ${single ? 'registro' : 'registros'} `}</strong>
        de ocorrência da <strong>{` ${dpNumber}`}ª DP</strong> não chegaram no MPRJ
      </span>
    );
  }

  return {
    actions: [DOWNLOAD_LIST(UNSENT_OCCURRENCE_LIST({ dpNumber, token })), DETAIL(), DELETE],
    backgroundColor: '#F8BD6C',
    icon: <Ro />,
    key,
    message,
  };
}

function ctacConstructor({ dropdown, alertCode, count, docNum }) {
  let key;
  let message;

  if (dropdown) {
    key = `${alertCode}-dropdown`;
    const single = count === 1;
    message = (
      <span>
        <strong>{`Você celebrou ${count} ${single ? 'tac' : 'tacs'} `}</strong>
        no procedimento <strong> xxx </strong> e ainda não comunicou ao conselho Superior do
        Ministerio Público.
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    message = (
      <span>
        <strong>{`Você celebrou ${count} ${single ? 'tac' : 'tacs'} `}</strong>
        no procedimento <strong> xxx </strong> e ainda não comunicou ao conselho Superior do
        Ministerio Público.
      </span>
    );
  }

  return {
    actions: [DETAIL(), DELETE],
    backgroundColor: '#F86C72',
    icon: <Clock />,
    key,
    message,
  };
}

function pppvConstructor({ dropdown, alertCode, count, docNum, orgao, docDk }, cpf, token) {
  let key;
  let message;
  let actions = [];
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
        <strong> prazo proxímo de vencer.</strong>
      </span>
    );
  } else {
    key = `${alertCode}-${docNum}`;
    actions = [
      GENERATE_MINUTA(PPPV_ACTION_CONVERT({ orgao, token, docDk, cpf })),
      EXTEND_DEADLINE(PPPV_ACTION_EXTEND({ orgao, token, docDk, cpf })),
      DELETE,
    ];
    message = (
      <span>
        O procedimento preparatório {``}
        <strong>{`${docNum}`}</strong> {``}
        está com o<strong> prazo proxímo de vencer.</strong>.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}
function ppfpConstructor({ dropdown, alertCode, count, docNum, orgao, docDk }, cpf, token) {
  let key;
  let message;
  let actions = [];
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
    actions = [
      GENERATE_MINUTA(PPFP_ACTION_CONVERT({ orgao, token, docDk, cpf })),
      EXTEND_DEADLINE(PPFP_ACTION_EXTEND({ orgao, token, docDk, cpf })),
      DELETE,
    ];
    message = (
      <span>
        O procedimento preparatório
        <strong>{` ${docNum} `}</strong>
        está com o<strong> prazo de tratamento esgotado</strong>.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function abr1Constructor({ dropdown, alertCode, docNum, orgao, docDk }, cpf, token) {
  let key;
  let message;
  let actions = [];
  if (dropdown) {
    key = `${alertCode}-dropdown`;
    message = (
      <span>
       Você está no mês de comunicação de procedimentos com mais de 1 ano de tramitação ao CSMP
      </span>
    );
    return {
    backgroundColor: '#f86c72',
    icon: <ClockIcon />,
    key,
    message,
    }
  } else {
    key = `${alertCode}-${docNum}`;
    actions = [
      DOWNLOAD_LIST(ABR1_ALERT_ACTION({ orgao, token, docDk, cpf })), DETAIL(), DELETE,
    ];
    message = (
      <span>
        Clique aqui para baixar o modelo oficial
         de comunicação com a listagem dos seus procedimentos
      </span>
    );
    return {
    backgroundColor: '#2DE288',
    icon: <ClockIcon />,
    actions,
    key,
    message,
    }
  }
}
