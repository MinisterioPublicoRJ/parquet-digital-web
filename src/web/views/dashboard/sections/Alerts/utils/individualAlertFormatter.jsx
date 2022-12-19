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
  Ro,
  Arrow,
  LogoSaneamento,
  FebtIcon,
  PigCAVL,
  PainelCOVID,
  Impropriety,
} from '../../../../../assets';

import {
  PRCR_ACTION_GENERATE_DOC,
  COMPRAS_ACTION_OUVIDORIA,
  CTAC_ACTION_GENERATE_DOC,
  IC1A_ACTION_GENERATE_DOC,
  PA1A_ACTION_GENERATE_DOC,
  PPFP_ACTION_EXTEND,
  PPFP_ACTION_CONVERT,
  PPPV_ACTION_EXTEND,
  PPPV_ACTION_CONVERT,
  UNSENT_OCCURRENCE_LIST,
  ABR1_ALERT_ACTION,
  LINK_ACTION_OUVIDORIA,
  PROCESSES_LIST_GENERATE_DOC,
} from '../../../../../api/endpoints';

import {
  DELETE,
  COMPRAS,
  COMPRAS_COVID,
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
  GENERATE_CSV,
  CALCULO_IIMP,
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
  switch (alert.alertCode) {
    // ALERTAS DA TUTELA
    case 'DCTJ':

    case 'DCTJ2':
      return dctjConstructor(alert, orgao, cpf, token);

    case 'DNTJ':
      return dntjConstructor(alert, orgao, cpf, token);

    case 'MVVD':
      return mvvdConstructor(alert, orgao, cpf, token);

    case 'PA1A':
      return pa1aConstructor(alert, orgao, cpf, token);

    //Procedimento preparatório fim prazo
    case 'PPFP':
      return ppfpConstructor(alert, orgao, cpf, token);

    //Procedimento preparatório proximo de vencer
    case 'PPPV':
      return pppvConstructor(alert, orgao, cpf, token);

    case 'IC1A':
      return ic1aConstructor(alert, orgao, cpf, token);

    case 'NF30':
      return nf30Constructor(alert, orgao, cpf, token);

    case 'NF120':
      return nf120Constructor(alert, orgao, cpf, token);

    case 'OFFP':
      return offpConstructor(alert, orgao, cpf, token);

    case 'OUVI':
      return ouviConstructor(alert, orgao, token);

    //vistas abertas documentos fechados
    case 'VADF':
      return vadfConstructor(alert, orgao, cpf, token);

    case 'BDPA':
      return bdpaConstructor(alert);

    //ALERTAS DE COMPRAS
    case 'COMP':
      return compConstructor(alert, orgao, cpf, token);

    case 'COMP_PROD':
      return cavlConstructor(alert, orgao, cpf, token);

    //indicadores de saneamento
    case 'ISPS':
      return ispsConstructor(alert, orgao, cpf, token);

    //case 'RO':
    //return roOccurrence(alert, orgao, cpf, token);

    case 'ABR1':
      return abr1Constructor(alert, orgao, cpf, token);

    // ALERTAS DE PRESCRIÇÃO
    case 'PRCR':
    //procedimentos todos crimes possivelmente prescritos
    case 'PRCR1':
    //procedimentos todos crimes prescreverão < 90dias
    case 'PRCR2':
    //procedimentos ao menos um crime possivelmente prescrito
    case 'PRCR3':
    //procedimentos um crime prescreverá < 90 dias
    case 'PRCR4':
      return prcrConstructor(alert, orgao, cpf, token);

    //ALERTAS DA PIP
    case 'GATE':
      return gateConstructor(alert, orgao, cpf, token);

    //movimentação procedimento segunda instância
    case 'DT2I':
      return dt2iConstructor(alert, orgao, cpf, token);

    case 'CTAC':
      return ctacConstructor(alert, orgao, cpf, token);

    case 'IIMP':
      return iimpConstructor(alert, orgao, cpf, token);

    case 'FEBT':
      return febtConstructor(alert);

    default:
      return {};
  }
}
function iimpConstructor(alert, orgao, cpf, token) {
  const { dropdown, alertCode, alertId, count, docNum, docDk, lastProrrogationDate } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há <strong> {`${count}`} </strong>
        {`${single ? ' inquérito' : 'inquéritos'}`} {`${single ? ' civil' : 'civis'}`} sobre
        improbidade administrativa que {`${single ? ' precisa' : 'precisam'}`} de tratamento.
      </span>
    );
  } else {
    actions = [DETAIL(), CALCULO_IIMP(), DELETE];
    const single = count === 1;
    message = (
      <span>
        O Inquérito Civil
        <strong>{` ${docNum} `}</strong>
        sobre improbidade administrativa precisa de tratamento.
      </span>
    );
  }

  return {
    type: alertCode,
    actions,
    backgroundColor: '#FF7B01 ',
    backgroundColorChild: '#D7751A ',
    icon: <Impropriety />,
    key,
    message,
    docDk,
    lastProrrogationDate,
  };
}

function cavlConstructor(alert, orgao, cpf, token) {
  const { contrato_iditem, contrato, item, iditem, dropdown, alertCode, count, alertId } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        <strong> {`${count}`} </strong>
        {`${
          single
            ? 'compra com preço atípico foi verificada '
            : 'compras com preços atípicos foram verificadas '
        }`}
        em contratos públicos.
      </span>
    );
  } else {
    actions = [
      OUVIDORIA_COMPRAS(LINK_ACTION_OUVIDORIA({ alertId, alertCode, orgao, token })),
      COMPRAS({ compId: contrato_iditem, contrato }),
      DELETE,
    ];
    const single = count === 1;
    message = (
      <span>
        Os valores do contrato
        <strong>{` ${contrato} `}</strong>
        {`${single ? 'item: ' : 'itens: '}`}
        <strong>{` ${item.substring(0, 40).toLowerCase()}... `}</strong>
        apresentaram possíveis sobrepreços.
      </span>
    );
  }

  return {
    type: alertCode,
    actions,
    backgroundColor: '#F8BD6C',
    backgroundColorChild: '#D69F53',
    icon: <PigCAVL />,
    key,
    message,
  };
}

function compConstructor(alert, orgao, cpf, token) {
  const { contrato_iditem, contrato, item, iditem, dropdown, alertCode, count, alertId } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];
  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ alertId, alertCode, orgao, token }))];
    COMPRAS_COVID({ compId: contrato_iditem, contrato });

    const single = count === 1;
    message = (
      <span>
        <strong>{`${count}`}</strong>{' '}
        {`${
          single
            ? 'compra com preço atípico foi verificada '
            : 'compras com preços atípicos foram verificadas '
        }`}
        <strong>durante a emergência sanitária de COVID-19, e </strong>
        apresentam <strong>possíveis sobrepreços</strong>.
      </span>
    );
  } else {
    actions = [
      OUVIDORIA_COMPRAS(LINK_ACTION_OUVIDORIA({ alertId, alertCode, orgao, token })),
      COMPRAS_COVID({ compId: contrato_iditem, contrato }),
      DELETE,
    ];
    const single = count === 1;
    message = (
      <span>
        Os valores do contrato
        <strong>{` ${contrato} `}</strong>,{`${single ? 'item: ' : 'itens: '}`}
        <strong>{` ${item.substring(0, 40).toLowerCase()}... `}</strong>
        possivelmente ensejam a atenção do MPRJ.
      </span>
    );
  }

  return {
    type: alertCode,
    actions,
    backgroundColor: '#F8BD6C',
    backgroundColorChild: '#D69F53',
    icon: <PainelCOVID />,
    key,
    message,
  };
}

function ispsConstructor(alert, orgao, cpf, token) {
  const { description, hierarchy, dropdown, alertCode, count, alertId, docNum } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>Há 
        <strong> {`${count}`} </strong>
        {`${single ? 'indicador' : 'indicadores'}`} de cobertura de Saneamento Básico em
        <strong> vermelho </strong> na sua região
      </span>
    );
  } else {
    actions = [
      OUVIDORIA_ISPS(LINK_ACTION_OUVIDORIA({ alertId, alertCode, orgao, token })),
      SANEAMENTO(),
      DELETE,
    ];
    message = (
      <span>
        O indicador <strong>{` ${description} `}</strong> de Saneamento Básico na comarca{' '}
        <strong>{` ${hierarchy} `}</strong>
        está em vermelho.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#71D0A4',
    backgroundColorChild: '#439A71',
    icon: <LogoSaneamento />,
    key,
    message,
  };
}

function dctjConstructor({ dropdown, alertCode, count, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions;

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;

    switch (alertCode) {
      case 'DCTJ':
        message = (
          <span>
            Há
            {single ? ' um processo criminal ' : ` ${count} processos criminais `}
            no TJRJ há <strong> mais de 60 dias </strong>
            sem retorno.
          </span>
        );
        break;
      case 'DCTJ2':
        message = (
          <span>
            Há
            {single ? ' um processo criminal ' : ` ${count} processos criminais `}
            no TJRJ há <strong> mais de 180 dias </strong>
            sem retorno.
          </span>
        );
        break;
    }
  } else {
    actions = [DETAIL(), DELETE];

    switch (alertCode) {
      case 'DCTJ':
        message = (
          <span>
            O processo criminal
            <strong> {`${docNum}`} </strong>
            está há
            <strong> mais de 60 dias </strong>
            no TJRJ sem retorno.
          </span>
        );
        break;
      case 'DCTJ2':
        message = (
          <span>
            O processo criminal
            <strong> {`${docNum}`} </strong>
            está há
            <strong> mais de 180 dias </strong>
            no TJRJ sem retorno.
          </span>
        );
        break;
    }
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <Tjrj />,
    key,
    message,
  };
}

function dntjConstructor({ dropdown, alertCode, count, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        {single ? ' um processo civil ' : ` ${count} processos cíveis  `}
        no TJRJ <strong> há mais de 120 dias </strong>.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        O processo civil <strong>{`${docNum}`}</strong> está há
        <strong> mais de 120 dias </strong>
        no TJRJ sem retorno.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <Tjrj />,
    key,
    message,
  };
}

function mvvdConstructor({ dropdown, alertCode, count, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{`${single ? 'um novo documento' : `${count} novos documentos`} `}</strong>
        com pelo menos uma
        <strong> vitima recorrente </strong>
        de
        <strong> VDFM.</strong>
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        O documento {``}
        <strong>{`${docNum}`}</strong> {``}
        possui pelo menos uma
        <strong> vítima recorrente </strong>
        de
        <strong> violência domestica.</strong>
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <IconVd />,
    key,
    message,
  };
}

function pa1aConstructor(
  { dropdown, alertCode, count, docNum, docDk, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
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
    actions = [
      GENERATE_DOC(PA1A_ACTION_GENERATE_DOC({ orgao, cpf, docDk, token })),
      CALCULO(),
      DELETE,
    ];
    message = (
      <span>
        O procedimento administrativo {``}
        <strong>{`${docNum}`}</strong> {``}
        está aberto
        <strong> há mais de um ano</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#5C6FD9',
    backgroundColorChild: '#7956A7',
    icon: <ClockIcon />,
    key,
    message,
    docDk,
  };
}

function ic1aConstructor(
  { dropdown, alertCode, count, docNum, docDk, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>
          {single ? 'um inquérito civil' : `${count} inquéritos civis`}
          sem prorrogação{' '}
        </strong>
        há
        <strong> mais de 1 ano</strong>.
      </span>
    );
  } else {
    actions = [
      GENERATE_DOC(IC1A_ACTION_GENERATE_DOC({ orgao, cpf, docDk, token })),
      CALCULO(),
      DELETE,
    ];
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
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
    docDk,
  };
}

function nf30Constructor({ dropdown, alertCode, count, docNum, date, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        {single ? 'uma notícia de fato há mais de ' : `${count} notícias de fato há mais de `}
        <strong>30 dias sem finalização, autuação ou prorrogação</strong>
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        A notícia de fato <strong>{` ${docNum} `}</strong>
        está há mais de 30 dias
        <strong> sem finalização, autuação ou prorrogação.</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function nf120Constructor(
  { dropdown, alertCode, count, docNum, date, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        {single ? 'uma notícia de fato há mais de ' : `${count} notícias de fato há mais de `}
        <strong>120 dias sem finalização, autuação ou prorrogação</strong>
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        A notícia de fato <strong>{` ${docNum} `}</strong>
        está há mais de 120 dias
        <strong> sem finalização, autuação ou prorrogação.</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function offpConstructor({ dropdown, alertCode, count, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    //actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        O ofício
        <strong>{` ${docNum} `}</strong>
        está com o<strong> prazo de apreciação esgotado</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function ouviConstructor(alert, orgao, token) {
  const { dropdown, alertCode, count, docNum, alertId } = alert;

  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    const single = count === 1;
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    message = (
      <span>
        <strong>{`Há ${single ? 'um expediente' : `${count} expedientes`}`}</strong>
        <strong>{` de Ouvidoria pendente de recebimento`}</strong>.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        O expediente de Ouvidoria
        <strong>{` ${docNum} `}</strong>
        foi remetido para esse orgão, mas
        <strong> não foi registrado seu recebimento</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#5C6FD9',
    backgroundColorChild: '#7956A7',
    icon: <Ouvidoria />,
    key,
    message,
  };
}

function vadfConstructor({ dropdown, alertCode, count, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>
          {single
            ? ' uma vista aberta em um documento finalizado.'
            : ` ${count} vistas abertas em documentos finalizados.`}
        </strong>
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        O documento
        <strong>{` ${docNum} `}</strong>
        possui <strong> vista aberta, </strong>
        mas está <strong> registrado como fechado</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#28A7E0',
    backgroundColorChild: '#1D78A2',
    icon: <Va />,
    key,
    message,
  };
}

function prcrConstructor(
  { dropdown, alertCode, count, docNum, docDk, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;

    switch (alertCode) {
      case 'PRCR1':
        message = (
          <span>
            <strong>Há</strong>
            {single ? ' um procedimento ' : ` ${count}  procedimentos `}
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
            <strong>Há</strong>
            {single ? ' um procedimento ' : ` ${count}  procedimentos `}
            em que possivelmente todos os crimes
            <strong> prescreverão em breve </strong>
          </span>
        );
        break;
      case 'PRCR3':
        message = (
          <span>
            <strong>Há</strong>
            {single ? ' um procedimento ' : ` ${count}  procedimentos `}
            com pelo menos um crime
            <strong> possivelmente prescrito. </strong>
          </span>
        );
        break;
      case 'PRCR4':
        message = (
          <span>
            <strong>Há</strong>
            {single ? ' um procedimento ' : ` ${count}  procedimentos `}
            com um crime que
            <strong> possivelmente prescreverá em breve </strong>
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
            tem pelo menos um
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
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
    docDk,
  };
}

function gateConstructor(alert, orgao, cpf, token) {
  const { dropdown, alertCode, count, docNum, alertIdGate, alertId } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há{' '}
        <strong>{single ? 'um documento com nova IT' : `${count} documentos com novas ITs`}</strong>
        do <strong> GATE </strong>.
      </span>
    );
  } else {
    actions = [IT(alertIdGate), DELETE];
    message = (
      <span>
        O<strong> GATE </strong>
        finalizou a<strong> IT </strong>
        solicitada no documento
        <strong>{` ${docNum}`}</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#374354',
    backgroundColorChild: '#14181E',
    icon: <CorujaGate />,
    key,
    message,
  };
}

function dt2iConstructor({ dropdown, alertCode, count, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há movimentações na <strong> segunda instância</strong> em
        <strong>{single ? ' um processo ' : ` ${count} processos `}</strong>
        desta promotoria.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        O processo
        <strong>{` ${docNum}`}</strong>
        possui
        <strong> movimentações na segunda instância</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#5C6FD9',
    backgroundColorChild: '#7956A7',
    icon: <Home />,
    key,
    message,
  };
}

function roOccurrence(alert, orgao, cpf, token) {
  const { dropdown, alertCode, count, daysPassed, alertId, docNum, hierarchy } = alert;
  const dp = hierarchy;
  const dpNumber = dp?.replace(/[^0-9]/g, '');
  const unsentOcurrences = daysPassed;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    //actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há <strong>{single ? ' uma DP ' : ` ${count} DPs`}</strong>
        da sua região ROs que não foram encaminhados ao MPRJ.
      </span>
    );
  } else {
    actions = [DOWNLOAD_LIST(UNSENT_OCCURRENCE_LIST({ dpNumber, token })), DETAIL(), DELETE];
    const single = unsentOcurrences === 1;
    message = (
      <span>
        Há <strong>{` ${unsentOcurrences} ${single ? ' RO ' : ' ROs '} `}</strong>
        da delegacia <strong>{` ${dp}`}</strong> ainda não foram remetidos ao MPRJ.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F8BD6C',
    backgroundColorChild: '#D69F53',
    icon: <Ro />,
    key,
    message,
  };
}

function ctacConstructor(
  { dropdown, alertCode, count, docNum, docDk, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    const single = count === 1;
    message = (
      <span>
        Há <strong></strong> {single ? ' um TAC ' : ` ${count} TACs `}
        <strong>sem ofício ao CSMP.</strong>
      </span>
    );
  } else {
    actions = [
      GENERATE_MINUTA(CTAC_ACTION_GENERATE_DOC({ orgao, token, docDk, cpf })),
      DETAIL(),
      DELETE,
    ];
    message = (
      <span>
        No documento <strong>{`${docNum}`}</strong> houve
        <strong>celebração de TAC que ainda não foi comunicado ao CSMP.</strong>
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function pppvConstructor(
  { dropdown, alertCode, count, docNum, docDk, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];
  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} ${
          single ? 'procedimento preparatório' : 'procedimentos preparatórios'
        } `}</strong>
        com
        <strong> prazo próximo de vencer.</strong>
      </span>
    );
  } else {
    actions = [
      GENERATE_MINUTA(PPPV_ACTION_CONVERT({ orgao, token, docDk, cpf })),
      EXTEND_DEADLINE(PPPV_ACTION_EXTEND({ orgao, token, docDk, cpf })),
      DELETE,
    ];
    message = (
      <span>
        O procedimento preparatório {``}
        <strong>{`${docNum}`}</strong> {``}
        está com o<strong> prazo próximo de vencer.</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}
function ppfpConstructor(
  { dropdown, alertCode, count, docNum, docDk, alertId },
  orgao,
  cpf,
  token,
) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];
  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({ orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>
          {` ${count} ${single ? 'procedimento preparatório' : 'procedimentos preparatórios'} `}
          fora do prazo.
        </strong>
      </span>
    );
  } else {
    actions = [
      GENERATE_MINUTA(PPFP_ACTION_CONVERT({ orgao, token, docDk, cpf })),
      EXTEND_DEADLINE(PPFP_ACTION_EXTEND({ orgao, token, docDk, cpf })),
      DELETE,
    ];
    message = (
      <span>
        O procedimento preparatório
        <strong>{` ${docNum} `}</strong>
        está <strong> fora do prazo</strong>.
      </span>
    );
  }

  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function abr1Constructor({ dropdown, alertCode, docNum, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];
  if (dropdown) {
    //actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
    message = (
      <span>
        Você está no mês de comunicação de procedimentos com mais de 1 ano de tramitação ao CSMP.
      </span>
    );
    return {
      type: alertCode,
      docNum,
      actions,
      backgroundColor: '#F86C72',
      backgroundColorChild: '#D94F55',
      icon: <ClockIcon />,
      key,
      message,
    };
  } else {
    actions = [DOWNLOAD_LIST(ABR1_ALERT_ACTION({ orgao, token, cpf })), DELETE];
    message = (
      <span>
        Clique aqui para baixar uma listagem desses procedimentos. Lembre-se de adequa-la às
        exigências do CSMP.
      </span>
    );
    return {
      type: alertCode,
      docNum,
      backgroundColor: '#2DE288',
      icon: <Arrow />,
      actions,
      key,
      message,
    };
  }
}

function bdpaConstructor({ dropdown, alertCode, count, docNum, hierarchy, alertId }) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    const single = count === 1;
    message = (
      <span>
        <strong>{`Você tem ${count} ${single ? 'procedimento' : 'procedimentos'} `}</strong>
        de baixa à DP que não retornaram no prazo estipulado.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        <strong>{`O procedimento ${docNum}`}</strong>
        {``} sofreu baixa à <strong>DP {hierarchy}</strong> e não retornou no prazo.
      </span>
    );
  }
  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function febtConstructor(alert) {
  const { dropdown, alertId, alertCode, count, hierarchy } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    const single = count === 1;
    message = (
      <span>
        Há {single ? ` uma DP ` : ` ${count} DPs `} da sua região que não
        {single ? ` remeteu ` : ` remeteram `} novos ROs.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = <span>A Delegacia {hierarchy} não encaminha novos ROs há 30 dias.</span>;
  }
  return {
    type: alertCode,
    docNum,
    actions,
    backgroundColor: '#F8BD6C',
    backgroundColorChild: '#D69F53',
    icon: <FebtIcon />,
    key,
    message,
  };
}
