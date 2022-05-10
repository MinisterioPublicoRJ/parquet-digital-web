import t from 'lodash.template';

export const BASE_URL = `${process.env.REACT_APP_BASE_URL}/dominio`;

export const SCA_LOGIN = `/token/login-promotron/`;
export const TOKEN_LOGIN = `/token/login/`;

export const TODAY_OUT = t(`${BASE_URL}/saidas/\${orgao}`);
export const TODAY_OUTLIERS = t(`${BASE_URL}/outliers/\${orgao}`);
export const TODAY_ENTRIES = t(`${BASE_URL}/entradas/\${orgao}/\${cpf}`);