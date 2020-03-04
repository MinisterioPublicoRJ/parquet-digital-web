import template from 'lodash.template';

export const BASE_URL = 'http://d-apimpmapas-devmpmapas.devcloud.mprj.mp.br/dominio';

export const TODAY_OUT = `${BASE_URL}/saidas`;
export const TODAY_OUTLIERS = `${BASE_URL}/outliers`;
export const TODAY_ENTRIES = `${BASE_URL}/entradas`;

export const OPEN_CASES_URL = template(`${BASE_URL}/suamesa/vistas/\${id}/\${cpf}`);
export const OPEN_INVESTIGATIONS_URL = template(`${BASE_URL}/suamesa/investigacoes/\${id}`);
export const COURT_CASES_URL = template(`${BASE_URL}/suamesa/processos/\${id}`);
export const CLOSED_CASES_URL = template(`${BASE_URL}/suamesa/finalizados/\${id}`);

export const OPEN_CASES_DETAILS_URL = template(`${BASE_URL}/suamesa/detalhe/vistas/\${id}/\${cpf}`);
export const COURT_CASES_DETAILS_URL = template(`${BASE_URL}/suamesa/detalhe/processos/\${id}`);
export const OPEN_INVESTIGATIONS_DETAILS_URL = template(
  `${BASE_URL}/suamesa/detalhe/investigacoes/\${id}`,
);
