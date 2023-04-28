import axios from 'axios';

import {
  BASE_URL,
  SCA_LOGIN,
  TOKEN_LOGIN,
  TODAY_OUT,
  TODAY_OUTLIERS,
  TODAY_ENTRIES,
  OPEN_CASES_DETAILS_URL,
  DESK_INTEGRATED,
  DESK_DETAIL_INTEGRATED,
  COURT_CASES_DETAILS_URL,
  OPEN_INVESTIGATIONS_DETAILS_URL,
  OPEN_CASES_LIST,
  RADAR_DATA,
  PIP_RADAR_URL,
  CRIMINAL_RADAR_URL,
  ALERTS_LIST,
  TOTAL_ALERTS_LIST,
  HIRES_ALERTS,
  CAVL_ALERTS,
  MISCONDUCT_ALERT,
  PROCESSING_TIME_DATA,
  PROCESSES_LIST,
  ONGOING_INVESTIGATIONS_LIST,
  SUCCESS_INDICATORS,
  PIP__URL,
  PIP_MONTH_OPPENINGS_URL,
  PIP_INVESTIGATIONS_URL,
  PIP_MAIN_INVESTIGATIONS_URL,
  PIP_MAIN_INVESTIGATIONS_URL_ACTION,
  DELETE_ALERT,
  UNDO_DELETE_ALERT,
  INVESTIGATED_PROFILE_URL,
  RADAR_COMPARE_TUTELA,
  RADAR_COMPARE_PIP,
} from './endpoints';

import {
  scaUserTransform,
  jwtUserTransform,
  todayOutTransform,
  todayOutliersTransform,
  todayEntriesTransform,
  openCasesDetailsTransform,
  deskIntegratedTransform,
  deskTabTransform,
  courtCasesDetailsTransform,
  openInvestigationsDetailsTransform,
  openCasesListTransform,
  radarTransform,
  pipRadarTransform,
  radarCriminalTransform,
  alertsTransform,
  totalAlertsTransform,
  hiresAlertsTransform,
  cavlAlertsTransform,
  misconductAlertsTransform,
  processingTimeTransform,
  processListTransform,
  ongoingInvestigationsListTransform,
  successIndicatorsTransform,
  investigatedProfileTransform,
  radarCompareTransform,
  snakeToCamelTransform,
} from './transforms';

import { formatDateObjForBackend } from '../../web/utils/formatters';

function ApiCreator(jwtToken) {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: { jwt: jwtToken },
  });

  // axios bug not allowing params and other configs being changed after creating instance
  function addHeaders() {
    //axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    /*  axiosInstance = axios.create({
      baseURL: BASE_URL, 
      params: {jwt: token}
    });
*/
    // axiosInstance.defaults.params = {jwt: token};
  }

  async function loginWithSCACredentials(username, password) {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);

    const { data } = await axiosInstance.post(SCA_LOGIN, formData);
    const { token, cpf, orgao_selecionado } = data;
    axiosInstance.defaults.params = { jwt: token };

    return scaUserTransform(data);
  }

  async function loginWithJwtCredentials(token) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axiosInstance.post(TOKEN_LOGIN, formData);
    axiosInstance.defaults.params = { jwt: token };

    return jwtUserTransform(data);
  }

  /**
   * fetches percentage info for the Today page from the backend
   * @param  {string} orgao promotoria's orgao
   * @return {number}    [description]
   */

  async function getTodayOutData({ orgao }) {
    const { data } = await axiosInstance.get(TODAY_OUT({ orgao }));

    return todayOutTransform(data);
  }

  /**
   * fetches acervo info for the Today page from the backend
   * @param  {string} orgao promotoria's orgao
   * @param  {date} date day you want tinfo from
   * @return {json}      { acervoQtd: Number, primQ: Number, mediana, terQ: Number, cod: number }
   */
  async function getTodayOutliersData({ orgao }, date) {
    const dateFormated = formatDateObjForBackend(date);
    const { data } = await axiosInstance.get(TODAY_OUTLIERS({ orgao, date: dateFormated }));

    return todayOutliersTransform(data);
  }

  async function getTodayEntriesData({ orgao, cpf }) {
    const { data } = await axiosInstance.get(TODAY_ENTRIES({ orgao, cpf }));

    return todayEntriesTransform(data);
  }

  async function getOpenCasesDetails({ orgao, cpf }) {
    const { data } = await axiosInstance.get(OPEN_CASES_DETAILS_URL({ orgao, cpf }));

    return openCasesDetailsTransform(data);
  }

  async function getIntegratedDeskDocs({ orgao, cpf, docType }) {
    const { data } = await axiosInstance.get(DESK_INTEGRATED({ orgao, cpf, docType }));

    return deskIntegratedTransform(data);
  }

  async function getIntegratedDeskDetails({ orgao, cpf, docType, type }) {
    const { data } = await axiosInstance.get(DESK_DETAIL_INTEGRATED({ orgao, cpf, docType, type }));

    return deskTabTransform(data);
  }

  async function getCourtCasesDetails({ orgao }) {
    const { data } = await axiosInstance.get(COURT_CASES_DETAILS_URL({ orgao }));

    return courtCasesDetailsTransform(data);
  }

  async function getOpenInvestigationsDetails({ orgao }) {
    const { data } = await axiosInstance.get(OPEN_INVESTIGATIONS_DETAILS_URL({ orgao }));

    return openInvestigationsDetailsTransform(data);
  }

  async function getOpenCasesList({ orgao, cpf }, list, page, searchString) {
    const params = {};

    if (searchString) {
      params.search_string = searchString;
    }

    if (page) {
      params.page = page;
    }

    const { data } = await axiosInstance.get(OPEN_CASES_LIST({ orgao, cpf, list }), { params });

    return openCasesListTransform(data);
  }

  async function getRadarData({ orgao }) {
    const { data } = await axiosInstance.get(RADAR_DATA({ orgao }));
    return radarTransform(data);
  }

  async function getPipRadarData({ orgao }) {
    const { data } = await axiosInstance.get(PIP_RADAR_URL({ orgao }));
    return pipRadarTransform(data);
  }

  async function getRadarDataCriminal({ orgao }) {
    const { data } = await axiosInstance.get(CRIMINAL_RADAR_URL({ orgao }));

    return radarCriminalTransform(data);
  }

  async function getAlerts({ orgao }) {
    const { data } = await axiosInstance.get(ALERTS_LIST({ orgao }));
    return alertsTransform(data);
  }

  async function getAlertsCount({ orgao }) {
    const { data } = await axiosInstance.get(TOTAL_ALERTS_LIST({ orgao }));

    return totalAlertsTransform(data);
  }

  async function getHiresAlerts({ orgao }) {
    const { data } = await axiosInstance.get(HIRES_ALERTS({ orgao }));

    return hiresAlertsTransform(data);
  }

  async function getCavlAlerts({ orgao }) {
    const { data } = await axiosInstance.get(CAVL_ALERTS({ orgao }));

    return cavlAlertsTransform(data);
  }

  async function getMisconductAlert({ orgao }) {
    const { data } = await axiosInstance.get(MISCONDUCT_ALERT({ orgao }));

    return misconductAlertsTransform(data);
  }

  async function getProcessingTimeData({ orgao }) {
    const { data } = await axiosInstance.get(PROCESSING_TIME_DATA({ orgao }));

    return processingTimeTransform(data);
  }

  async function getProcessList({ orgao }, page, searchString) {
    const params = {};

    if (searchString) {
      params.search_string = searchString;
    }

    const { data } = await axiosInstance.get(PROCESSES_LIST({ orgao, page }), { params });

    return processListTransform(data);
  }

  async function getOngoingInvestigationsList({ orgao }, page, searchString) {
    const params = {};

    if (searchString) {
      params.search_string = searchString;
    }

    const { data } = await axiosInstance.get(ONGOING_INVESTIGATIONS_LIST({ orgao, page }), {
      params,
    });

    return ongoingInvestigationsListTransform(data);
  }

  async function getsuccessIndicators({ orgao }) {
    const { data } = await axiosInstance.get(SUCCESS_INDICATORS({ orgao }));

    return successIndicatorsTransform(data);
  }

  async function getMainInvestigated({ orgao, cpf }, searchString, page) {
    const params = {};

    if (searchString) {
      params.search_string = searchString;
    }

    if (page) {
      params.page = page;
    }

    const { data } = await axiosInstance.get(PIP_MAIN_INVESTIGATIONS_URL({ orgao, cpf }), {
      params,
    });
    const cleanData = {};
    cleanData.investigated = data.investigados.map((item) => snakeToCamelTransform(item));
    cleanData.pages = data.nr_paginas;
    return cleanData;
  }

  async function actionMainInvestigated({ orgao, cpf, token, action, representanteDk }) {
    const formData = new FormData();
    formData.set('jwt', token);
    formData.set('action', action);
    formData.set('representante_dk', representanteDk);
    const { data } = await axiosInstance.post(
      PIP_MAIN_INVESTIGATIONS_URL_ACTION({ orgao, cpf, token }),
      formData,
    );
    return data;
  }

  async function removeAlert({ orgao, token, alertId }) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axiosInstance.post(DELETE_ALERT({ orgao, alertId }), formData);
    return data;
  }

  async function undoRemoveAlert({ orgao, token, alertId }) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axiosInstance.post(UNDO_DELETE_ALERT({ orgao, alertId }), formData);
    return data;
  }

  /**
   * This function gets investigated profile data with representanteDk with pessDk as optional param
   *
   * @param   {[string]}  token            [jwt or other login method]
   * @param   {[number]}  representanteDk  [number representing all simmilar people (pessDk)]
   * @param   {[number]}  pessDk           [number of an individual profile within representanteDk .similares]
   *
   * @return  {[JSON]}                   [profile data for the pessDk (.perfil, .procedimentos) or representanteDk (+ .similares)]
   */
  async function getInvestigatedProfile({ organTypeName, representanteDk, pessDk }) {
    const params = {};

    if (pessDk) {
      params.pess_dk = pessDk;
    }

    if (organTypeName === 'tutela') {
      params.orgao_type = organTypeName;
    }

    const { data } = await axiosInstance.get(INVESTIGATED_PROFILE_URL({ representanteDk }), {
      params,
    });
    return investigatedProfileTransform(data);
  }

  async function getRadarCompareData({ orgao, organType }) {
    const endpoint =
      organType === 1 ? RADAR_COMPARE_TUTELA({ orgao }) : RADAR_COMPARE_PIP({ orgao });
    const { data } = await axiosInstance.get(endpoint);

    return radarCompareTransform(data);
  }

  return {
    addHeaders,
    loginWithSCACredentials,
    loginWithJwtCredentials,
    getTodayOutData,
    getTodayOutliersData,
    getTodayEntriesData,
    getOpenCasesDetails,
    getIntegratedDeskDocs,
    getIntegratedDeskDetails,
    getCourtCasesDetails,
    getOpenInvestigationsDetails,
    getOpenCasesList,
    getRadarData,
    getPipRadarData,
    getRadarDataCriminal,
    getAlerts,
    getAlertsCount,
    getHiresAlerts,
    getCavlAlerts,
    getMisconductAlert,
    getProcessingTimeData,
    getProcessList,
    getOngoingInvestigationsList,
    getsuccessIndicators,
    getMainInvestigated,
    actionMainInvestigated,
    removeAlert,
    undoRemoveAlert,
    getInvestigatedProfile,
    getRadarCompareData,
  };
}

export default ApiCreator;
