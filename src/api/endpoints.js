import t from 'lodash.template';

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

export const COURT_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/processos/\${orgao}`);
export const OPEN_INVESTIGATIONS_DETAILS_URL = t(
  `${BASE_URL}/suamesa/detalhe/investigacoes/\${orgao}`,
);
export const OPEN_CASES_DETAILS_URL = t(`${BASE_URL}/suamesa/detalhe/vistas/\${orgao}/\${cpf}`);

export const OPEN_CASES_LIST = t(
  `${BASE_URL}/suamesa/lista/vistas/\${orgao}/\${cpf}/\${list}?page=\${page}&`,
);

export const RADAR_DATA = t(`${BASE_URL}/radar/\${orgao}`);

export const ALERTS_LIST = t(`${BASE_URL}/alertas/\${orgao}`);
export const TOTAL_ALERTS_LIST = t(`${BASE_URL}/alertas/list/\${orgao}`);
export const HIRES_ALERTS = t(`${BASE_URL}/alertas/compras/\${orgao}`);

export const PROCESSING_TIME_DATA = t(`${BASE_URL}/tempo-tramitacao/\${orgao}?version=1.1`);

export const PROCESSES_LIST = t(`${BASE_URL}/lista/processos/\${orgao}?page=\${page}`);
export const ONGOING_INVESTIGATIONS_LIST = t(
  `${BASE_URL}/lista/investigacoes/\${orgao}?page=\${page}`,
);

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
export const DELETE_ALERT = t(`${BASE_URL}/alertas/dispensar/\${orgao}/\${alertId}`);
export const UNDO_DELETE_ALERT = t(`${BASE_URL}/alertas/retornar/\${orgao}/\${alertId}`);
export const INVESTIGATED_PROFILE_URL = t(
  `${BASE_URL}/pip/principais-investigados-lista/\${representanteDk}`,
);

export const RADAR_COMPARE_TUTELA = t(`${BASE_URL}/comparador-radares/\${orgao}`);
export const RADAR_COMPARE_PIP = t(`${BASE_URL}/pip/comparador-radares/\${orgao}`);

export const PRCR_ACTION_GENERATE_DOC = t(
  `${BASE_URL}/documentos/minuta-prescricao/\${orgao}/\${cpf}/\${docDk}?jwt=\${token}`,
);

export const COMPRAS_ACTION_OUVIDORIA = t(
  `${BASE_URL}/alertas/ouvidoria/\${orgao}/\${alertCode}/\${alertId}?jwt=\${token}`,
);
export const LINK_ACTION_OUVIDORIA = t(
  `${BASE_URL}/alertas/ouvidoria/\${orgao}/\${alertCode}/\${alertId}?jwt=\${token}`,
);
export const ABR1_ALERT_ACTION = t(
  `${BASE_URL}/documentos/procedimentos-csmp/\${orgao}/\${cpf}?jwt=\${token}`,
);

export const ALERT_OVERLAY_DATA = t(`${BASE_URL}/alertas/overlay/\${docDk}`);

export const IC1A_ACTION_GENERATE_DOC = t(
  `${BASE_URL}/documentos/prorrogacao-ic/\${orgao}/\${cpf}/\${docDk}?jwt=\${token}`,
);
export const PPFP_ACTION_EXTEND = t(
  `${BASE_URL}/documentos/prorrogacao-pp/\${orgao}/\${cpf}/\${docDk}?jwt=\${token}`,
);
export const PPFP_ACTION_CONVERT = t(
  `${BASE_URL}/documentos/instauracao-ic/\${orgao}/\${cpf}/\${docDk}?jwt=\${token}`,
);
export const PPPV_ACTION_EXTEND = t(
  `${BASE_URL}/documentos/prorrogacao-pp/\${orgao}/\${cpf}/\${docDk}?jwt=\${token}`,
);
export const PPPV_ACTION_CONVERT = t(
  `${BASE_URL}/documentos/instauracao-ic/\${orgao}/\${cpf}/\${docDk}?jwt=\${token}`,
);
export const UNSENT_OCCURRENCE_LIST = t(
  `${BASE_URL}/documentos/ros-ausentes/\${dpNumber}?jwt=\${token}`,
);
export const PROCESSES_LIST_GENERATE_DOC = t(
  `${BASE_URL}/alertas/baixar/\${orgao}?tipo_alerta=\${alertCode}&jwt=\${token}`,
);
