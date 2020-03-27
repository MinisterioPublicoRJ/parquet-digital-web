import t from 'lodash.template';

// TODO: add _URL suffix to all constants

export const BASE_URL = `${process.env.REACT_APP_BASE_URL}/dominio`;

export const LOGIN_URL = `${BASE_URL}/token/login/`;

export const TODAY_OUT = t(`${BASE_URL}/saidas/\${orgao}`);
export const TODAY_OUTLIERS = t(`${BASE_URL}/outliers/\${orgao}/\${date}`);
export const TODAY_ENTRIES = t(`${BASE_URL}/entradas/\${orgao}/\${cpf}`);

export const OPEN_CASES_URL = t(`${BASE_URL}/suamesa/vistas/\${orgao}/\${cpf}`);
export const OPEN_INVESTIGATIONS_URL = t(`${BASE_URL}/suamesa/investigacoes/\${orgao}`);
export const COURT_CASES_URL = t(`${BASE_URL}/suamesa/processos/\${orgao}`);
export const CLOSED_CASES_URL = t(`${BASE_URL}/suamesa/finalizados/\${orgao}`);

export const OPEN_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/vistas/\${orgao}/\${cpf}`);
export const COURT_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/processos/\${orgao}`);
export const OPEN_INVESTIGATIONS_DETAILS_URL = t(
  `${BASE_URL}/suamesa/detalhe/investigacoes/\${orgao}`,
);

export const OPEN_CASES_LIST = t(`${BASE_URL}/suamesa/lista/vistas/\${orgao}/\${cpf}/\${list}`);

export const RADAR_DATA = t(`${BASE_URL}/radar/\${orgao}`);

export const ALERTS_LIST = t(`${BASE_URL}/alertas/\${orgao}`);

export const TRAMITACAO_DATA = t(`${BASE_URL}/tempoTramitacao/\${orgao}`);
