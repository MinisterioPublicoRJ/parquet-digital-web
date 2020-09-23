import t from 'lodash.template';

// TODO: add _URL suffix to all constants

export const BASE_URL = `${process.env.REACT_APP_BASE_URL}/dominio`;

export const LOGIN_URL = `${BASE_URL}/token/login/`;
export const LOGIN = `${BASE_URL}/token/login-promotron/`;

export const TODAY_OUT = t(`${BASE_URL}/saidas/\${orgao}`);

export const TODAY_OUTLIERS = t(`${BASE_URL}/outliers/\${orgao}`);
export const TODAY_ENTRIES = t(`${BASE_URL}/entradas/\${orgao}/\${cpf}`);

export const DESK_INTEGRATED = t(
  `${BASE_URL}/suamesa/documentos/\${orgao}?tipo=\${docType}&cpf=\${cpf}`,
);

export const DESK_DETAIL_INTEGRATED = t(
  `${BASE_URL}/suamesa/documentos-detalhe/\${orgao}?tipo=\${docType}&cpf=\${cpf}`,
);

export const OPEN_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/vistas/\${orgao}/\${cpf}`);
export const COURT_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/processos/\${orgao}`);
export const OPEN_INVESTIGATIONS_DETAILS_URL = t(
  `${BASE_URL}/suamesa/detalhe/investigacoes/\${orgao}`,
);

export const OPEN_CASES_LIST = t(`${BASE_URL}/suamesa/lista/vistas/\${orgao}/\${cpf}/\${list}`);

export const RADAR_DATA = t(`${BASE_URL}/radar/\${orgao}`);

export const ALERTS_LIST = t(`${BASE_URL}/alertas/\${orgao}`);
export const TOTAL_ALERTS_LIST = t(`${BASE_URL}/alertas/list/\${orgao}`);
export const HIRES_ALERTS = t(`${BASE_URL}/alertas/compras/\${orgao}`);

export const PROCESSING_TIME_DATA = t(`${BASE_URL}/tempo-tramitacao/\${orgao}?version=1.1`);

export const PROCESSES_LIST = t(`${BASE_URL}/lista/processos/\${orgao}`);

export const SUCCESS_INDICATORS = t(`${BASE_URL}/pip/indicadores-sucesso/\${orgao}`);
export const PIP__URL = t(`${BASE_URL}/pip/aproveitamentos/\${orgao}`);
export const PIP_MONTH_OPPENINGS_URL = t(`${BASE_URL}/pip/aberturas-mensal/\${orgao}/\${cpf}`);
export const PIP_INVESTIGATIONS_URL = t(`${BASE_URL}/pip/aisp/investigacoes/\${orgao}`);
export const PIP_RADAR_URL = t(`${BASE_URL}/pip/radar-performance/\${orgao}`);

export const PIP_MAIN_INVESTIGATIONS_URL = t(
  `${BASE_URL}/pip/principais-investigados/\${orgao}/\${cpf}`,
);
export const PIP_MAIN_INVESTIGATIONS_URL_ACTION = t(
  `${BASE_URL}/pip/principais-investigados/\${orgao}/\${cpf}`,
);
export const DELETE_ALERT = t(`${BASE_URL}/alertas/dispensar/\${orgao}/comp?alerta_id=\${alertId}`);
export const UNDO_DELETE_ALERT = t(
  `${BASE_URL}/alertas/retornar/\${orgao}/comp?alerta_id=\${alertId}`,
);
export const INVESTIGATED_PROFILE_URL = t(
  `${BASE_URL}/pip/principais-investigados-lista/\${representanteDk}`,
);
export const INVESTIGATED_PERSONAL_PROFILE_URL = t(
  `${BASE_URL}/pip/principais-investigados-lista/\${representanteDk}?pess_dk=\${pessDk}`,
);
