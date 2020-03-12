import t from 'lodash.template';

export const BASE_URL = `${process.env.REACT_APP_BASE_URL}/dominio`;

export const TODAY_OUT = t(`${BASE_URL}/saidas/\${id}`);
export const TODAY_OUTLIERS = t(`${BASE_URL}/outliers/\${id}/\${date}`);
export const TODAY_ENTRIES = t(`${BASE_URL}/entradas/\${id}/\${cpf}`);

export const OPEN_CASES_URL = t(`${BASE_URL}/suamesa/vistas/\${id}/\${cpf}`);
export const OPEN_INVESTIGATIONS_URL = t(`${BASE_URL}/suamesa/investigacoes/\${id}`);
export const COURT_CASES_URL = t(`${BASE_URL}/suamesa/processos/\${id}`);
export const CLOSED_CASES_URL = t(`${BASE_URL}/suamesa/finalizados/\${id}`);

export const OPEN_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/vistas/\${id}/\${cpf}`);
export const COURT_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/processos/\${id}`);
export const OPEN_INVESTIGATIONS_DETAILS_URL = t(
  `${BASE_URL}/suamesa/detalhe/investigacoes/\${id}`,
);
