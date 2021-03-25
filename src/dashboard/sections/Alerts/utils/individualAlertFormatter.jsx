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
  Arrow,
  LogoSaneamento,
  FebtIcon,
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
  LINK_ACTION_OUVIDORIA,
  PROCESSES_LIST_GENERATE_DOC,
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
  GENERATE_CSV,
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
    return dctjConstructor(alert);

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

    //indicadores de saneamento
    case 'ISPS':
    return ispsConstructor(alert, orgao, cpf, token);

    case 'RO':
    return roOccurrence(alert, orgao, cpf, token);

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
      return ctacConstructor(alert);

    case 'FEBT':
      return febtConstructor(alert);

    default:
      return {};
  }
}

function compConstructor(alert, orgao, cpf, token) {
  const { contrato_iditem, contrato, item, iditem, dropdown, alertCode, count, alertId } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token}))];
    const single = count === 1;
    message = (
      <span>
        <strong> {`${count}`} </strong>
        {`${single ? 'compra' : 'compras'}`} <strong>suspeitas</strong> foram verificadas em
        contratos públicos
      </span>
    );
  } else {
    actions = [
      OUVIDORIA_COMPRAS(LINK_ACTION_OUVIDORIA({ alertId, alertCode, orgao, token })),
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
    backgroundColorChild: '#D69F53',
    icon: <IconContratacoes />,
    key,
    message,
  };
}

function ispsConstructor(alert, orgao, cpf, token) {
  const { description, hierarchy, dropdown, alertCode, count, alertId } = alert;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token}))];
    const single = count === 1;
    message = (
      <span>
        <strong> {`${count}`} </strong>
        {`${single ? 'indicador' : 'indicadores'}`} de saneamento estão em
        <strong> vermelho </strong> nesta cidade
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
        Os valores do indicador <strong>{` ${description} `}</strong> na comarca de <strong>{` ${hierarchy} `}</strong>
        merecem sua atenção.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#71D0A4',
    backgroundColorChild: '#439A71',
    icon: <LogoSaneamento />,
    key,
    message,
  };
}

function dctjConstructor({ dropdown, alertCode, count, docNum, alertId }) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let action;

  if (dropdown) {
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
    actions = [DETAIL(), DELETE];
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
    //actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [DETAIL(), DELETE];
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
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [DETAIL(), DELETE];
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
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <IconVd />,
    key,
    message,
  };
}

function pa1aConstructor({ dropdown, alertCode, count, docNum, docDk, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [GENERATE_DOC(), CALCULO(), DELETE];
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
    actions,
    backgroundColor: '#5C6FD9',
    backgroundColorChild: '#7956A7',
    icon: <ClockIcon />,
    key,
    message,
    docDk,
  };
}

function ic1aConstructor({ dropdown, alertCode, count, docNum, docDk, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions =  [
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
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há
        <strong>{` ${count} `}</strong>
        {single ? 'notícia de fato autuada há mais de' : 'notícias de fato autuadas há mais de'}
        <strong> 30 dias </strong>
        que ainda
        <strong>
          {single ? 'não foi tratada ou prorrogada.' : 'não foram tratadas ou prorrogadas.'}
        </strong>
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        A notícia de fato autuada há mais de 30 dias
        <strong>{` ${docNum} `}</strong>
        ainda está
        <strong> sem tratamento</strong>.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}

function nf120Constructor({ dropdown, alertCode, count, docNum, date, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [DETAIL(), DELETE];
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
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token}))];
    message = (
      <span>
        <strong>{`Há ${count} ${single ? 'expediente' : 'expedientes'} de Ouvidoria `}</strong>
        {single ? 'enviado porém' : 'enviados porém'}
        <strong>{` não ${single ? 'recebido' : 'recebidos'}`}</strong>.
      </span>
    );
  } else {
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
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [DETAIL(), DELETE];
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
    actions,
    backgroundColor: '#28A7E0',
    backgroundColorChild: '#1D78A2',
    icon: <Va />,
    key,
    message,
  };
}

function prcrConstructor({ dropdown, alertCode, count, docNum, docDk, alertId }, orgao, cpf, token) {

  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        O<strong> GATE </strong> finalizou <strong>{`${count} ${single ? 'IT' : 'ITs'} `}</strong>
        em procedimentos desta promotoria de justiça.
      </span>
    );
  } else {
    actions = [IT(alertIdGate), DELETE];
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
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        <strong>{`Há ${count} ${single ? 'movimentação' : 'movimentações'} `}</strong>
        em procedimento desta promotoria na
        <strong> segunda instância.</strong>
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
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
    actions,
    backgroundColor: '#5C6FD9',
    backgroundColorChild: '#7956A7',
    icon: <Home />,
    key,
    message,
  };
}

function roOccurrence(alert, orgao, cpf, token) {
  const { dropdown, alertCode, count, daysPassed, alertId, alertIdExtra } = alert;
  const dpNumber = alertIdExtra;
  const unsentOcurrences = daysPassed;
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    //actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
    const single = count === 1;
    message = (
      <span>
        Há <strong>{` ${count} ${single ? 'DP' : 'DPs'} `}</strong>
        da sua região com registros de ocorrência que não chegaram no MPRJ
      </span>
    );
  } else {
    actions = [DOWNLOAD_LIST(UNSENT_OCCURRENCE_LIST({ dpNumber, token })), DETAIL(), DELETE];
    const single = unsentOcurrences === 1;
    action = [DOWNLOAD_LIST(UNSENT_OCCURRENCE_LIST({ dpNumber, token })), DETAIL(), DELETE];
    message = (
      <span>
        <strong>{` ${unsentOcurrences} ${single ? 'registro' : 'registros'} `}</strong>
        de ocorrência da <strong>{` ${dpNumber}`}ª DP</strong> não chegaram no MPRJ
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#F8BD6C',
    backgroundColorChild: '#D69F53',
    icon: <Ro />,
    key,
    message,
  };
}

function ctacConstructor({ dropdown, alertCode, count, docNum, alertId }) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];

  if (dropdown) {
    const single = count === 1;
    message = (
      <span>
        <strong>{`Você celebrou ${count} ${single ? 'tac' : 'tacs'} `}</strong>
        no procedimento <strong> xxx </strong> e ainda não comunicou ao conselho Superior do
        Ministerio Público.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        <strong>{`Você celebrou ${count} ${single ? 'tac' : 'tacs'} `}</strong>
        no procedimento <strong> xxx </strong> e ainda não comunicou ao conselho Superior do
        Ministerio Público.
      </span>
    );
  }

  return {
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <Clock />,
    key,
    message,
  };
}

function pppvConstructor({ dropdown, alertCode, count, docNum, docDk, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];
  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
  };
}
function ppfpConstructor({ dropdown, alertCode, count, docNum, docDk, alertId }, orgao, cpf, token) {
  const key = alertId ? alertId : `${alertCode}-dropdown`;
  let message;
  let actions = [];
  if (dropdown) {
    actions = [GENERATE_CSV(PROCESSES_LIST_GENERATE_DOC({orgao, alertCode, token }))];
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
    actions,
    backgroundColor: '#F86C72',
    backgroundColorChild: '#D94F55',
    icon: <ClockIcon />,
    key,
    message,
    }
  } else {
    actions = [
      DOWNLOAD_LIST(ABR1_ALERT_ACTION({ orgao, token, cpf })), DELETE,
    ];
    message = (
      <span>
        Clique aqui para baixar uma listagem desses procedimentos. Lembre-se de adequa-la às exigências do CSMP.
      </span>
    );
    return {
    backgroundColor: '#2DE288',
    icon: <Arrow />,
    actions,
    key,
    message,
    }
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
        Há {single ? ` uma DP ` : ` ${count} DPs `} da sua região que não {single ? ` enviou ` : ` enviaram `} novos registros de ocorrência ao MPRJ há mais de 30 dias.
      </span>
    );
  } else {
    actions = [DETAIL(), DELETE];
    message = (
      <span>
        Estamos há mais de 30 dias sem receber novos registros de ocorrência da {hierarchy}.
      </span>
    );
  }
  return {
    actions,
    backgroundColor: '#F8BD6C',
    backgroundColorChild: '#D69F53',
    icon: <FebtIcon />,
    key,
    message,
  };
}
