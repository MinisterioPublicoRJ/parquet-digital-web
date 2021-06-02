import axios from 'axios';

import {
  LOGIN_URL,
  LOGIN,
  TODAY_OUT,
  TODAY_OUTLIERS,
  TODAY_ENTRIES,
  OPEN_CASES_DETAILS_URL,
  COURT_CASES_DETAILS_URL,
  OPEN_INVESTIGATIONS_DETAILS_URL,
  OPEN_CASES_LIST,
  RADAR_DATA,
  PROCESSING_TIME_DATA,
  ALERTS_LIST,
  HIRES_ALERTS,
  TOTAL_ALERTS_LIST,
  PROCESSES_LIST,
  SUCCESS_INDICATORS,
  PIP_RADAR_URL,
  DESK_INTEGRATED,
  DESK_DETAIL_INTEGRATED,
  PIP_MAIN_INVESTIGATIONS_URL,
  PIP_MAIN_INVESTIGATIONS_URL_ACTION,
  DELETE_ALERT,
  UNDO_DELETE_ALERT,
  INVESTIGATED_PROFILE_URL,
  RADAR_COMPARE_TUTELA,
  RADAR_COMPARE_PIP,
  ONGOING_INVESTIGATIONS_LIST,
  ALERT_OVERLAY_DATA,
  PROCESS_DETAIL,
} from './endpoints';

import { formatDateObjForBackend } from '../utils/formatters';
import {
  openInvestigationsDetailsTransform,
  openCasesDetailsTransform,
  courtCasesDetailsTransform,
  todayOutTransform,
  todayOutliersTransform,
  todayEntriesTransform,
  openCasesListTransform,
  radarTransform,
  alertsTransform,
  totalAlertsTransform,
  hiresAlertsTransform,
  processingTimeTransform,
  successIndicatorsTransform,
  processListTransform,
  pipRadarTransform,
  deskIntegratedTransform,
  deskTabTransform,
  scaUserTranform,
  jwtUserTransform,
  snakeToCamelTransform,
  radarCompareTransform,
  ongoingInvestigationsListTransform,
  alertOverlayTransform,
  investigatedProfileTransform,
  processDetailTransform,
} from './transforms';

const buildRequestConfig = (jwt) => ({ params: { jwt } });

const Api = (() => {
  async function login(token) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axios.post(LOGIN_URL, formData);

    return jwtUserTransform(data);
  }

  async function scaLogin(username, password) {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);

    const { data } = await axios.post(LOGIN, formData);
    return scaUserTranform(data);
  }

  /**
   * fetches percentage info for the Today page from the backend
   * @param  {string} orgao promotoria's orgao
   * @return {number}    [description]
   */

  async function getTodayOutData({ orgao, token }) {
    const { data } = await axios.get(TODAY_OUT({ orgao }), buildRequestConfig(token));

    return todayOutTransform(data);
  }

  /**
   * fetches acervo info for the Today page from the backend
   * @param  {string} orgao promotoria's orgao
   * @param  {date} date day you want tinfo from
   * @return {json}      { acervoQtd: Number, primQ: Number, mediana, terQ: Number, cod: number }
   */
  async function getTodayOutliersData({ orgao, token }, date) {
    const dateFormated = formatDateObjForBackend(date);
    const { data } = await axios.get(
      TODAY_OUTLIERS({ orgao, date: dateFormated }),
      buildRequestConfig(token),
    );

    return todayOutliersTransform(data);
  }

  async function getTodayEntriesData({ orgao, cpf, token }) {
    const { data } = await axios.get(TODAY_ENTRIES({ orgao, cpf }), buildRequestConfig(token));

    return todayEntriesTransform(data);
  }

  async function getOpenCasesDetails({ orgao, cpf, token }) {
    const { data } = await axios.get(
      OPEN_CASES_DETAILS_URL({ orgao, cpf }),
      buildRequestConfig(token),
    );

    return openCasesDetailsTransform(data);
  }

  async function getOpenInvestigationsDetails({ orgao, token }) {
    const { data } = await axios.get(
      OPEN_INVESTIGATIONS_DETAILS_URL({ orgao }),
      buildRequestConfig(token),
    );

    return openInvestigationsDetailsTransform(data);
  }

  async function getCourtCasesDetails({ orgao, token }) {
    const { data } = await axios.get(COURT_CASES_DETAILS_URL({ orgao }), buildRequestConfig(token));

    return courtCasesDetailsTransform(data);
  }

  async function getOpenCasesList({ orgao, cpf, token }, list, page, searchString) {
    const params = {};

    if (searchString) {
      params.search_string = searchString;
    }

    if (page) {
      params.page = page;
    }

    params.jwt = token;

    const { data } = await axios.get(
      OPEN_CASES_LIST({ orgao, cpf, list }),
      {params}
    );

    return openCasesListTransform(data);
  }

  async function getRadarData({ orgao, token }) {
    const { data } = await axios.get(RADAR_DATA({ orgao }), buildRequestConfig(token));

    return radarTransform(data);
  }

  async function getProcessingTimeData({ orgao, token }) {
    const { data } = await axios.get(PROCESSING_TIME_DATA({ orgao }), buildRequestConfig(token));

    return processingTimeTransform(data);
  }

  async function getAlerts({ orgao, token }) {
    const { data } = await axios.get(ALERTS_LIST({ orgao }), buildRequestConfig(token));
    throw new Error("There's been a new relic test error!");


    return alertsTransform(data);
  }

  async function getAlertsCount({ orgao, token }) {
    const { data } = await axios.get(TOTAL_ALERTS_LIST({ orgao }), buildRequestConfig(token));

    return totalAlertsTransform(data);
  }
  async function getHiresAlerts({ orgao, token }) {
    const { data } = await axios.get(HIRES_ALERTS({ orgao }), buildRequestConfig(token));

    return hiresAlertsTransform(data);
  }

  async function getsuccessIndicators({ orgao, token }) {
    const { data } = await axios.get(SUCCESS_INDICATORS({ orgao }), buildRequestConfig(token));

    return successIndicatorsTransform(data);
  }

  async function getProcessList({ orgao, token }, page, searchString) {
    const params = { jwt: token };

    if (searchString) {
      params.search_string = searchString;
    }

    const { data } = await axios.get(PROCESSES_LIST({ orgao, page }), { params });

    return processListTransform(data);
  }

  async function getOngoingInvestigationsList({ orgao, token }, page, searchString) {
    const params = { jwt: token };

    if (searchString) {
      params.search_string = searchString;
    }

    const { data } = await axios.get(ONGOING_INVESTIGATIONS_LIST({ orgao, page }), { params });

    return ongoingInvestigationsListTransform(data);
  }

  async function getPipRadarData({ orgao, token }) {
    const { data } = await axios.get(PIP_RADAR_URL({ orgao }), buildRequestConfig(token));
    return pipRadarTransform(data);
  }

  async function getIntegratedDeskDocs({ orgao, token, cpf, docType }) {
    const { data } = await axios.get(
      DESK_INTEGRATED({ orgao, cpf, docType }),
      buildRequestConfig(token),
    );

    return deskIntegratedTransform(data);
  }

  async function getIntegratedDeskDetails({ orgao, token, cpf, docType }) {
    const { data } = await axios.get(
      DESK_DETAIL_INTEGRATED({ orgao, cpf, docType }),
      buildRequestConfig(token),
    );

    return deskTabTransform(data);
  }

  async function getMainInvestigated({ orgao, cpf, token }, searchString, page) {
    const params = { jwt: token };

    if (searchString) {
      params.search_string = searchString;
    }

    if (page) {
      params.page = page;
    }

    const {data} = await axios.get(PIP_MAIN_INVESTIGATIONS_URL({ orgao, cpf }), { params });
    let cleanData = {};
    cleanData.investigated = data.investigados.map((item) => snakeToCamelTransform(item));
    cleanData.pages = data.nr_paginas
    return cleanData;
  }

  async function actionMainInvestigated({ orgao, cpf, token, action, representanteDk }) {
    const formData = new FormData();
    formData.set('jwt', token);
    formData.set('action', action);
    formData.set('representante_dk', representanteDk);
    const { data } = await axios.post(
      PIP_MAIN_INVESTIGATIONS_URL_ACTION({ orgao, cpf, token }),
      formData,
      buildRequestConfig(token),
    );
    return data;
  }

  async function removeAlert({ orgao, token, alertId }) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axios.post(
      DELETE_ALERT({ orgao, alertId }),
      formData,
      buildRequestConfig(token),
    );
    return data;
  }

  async function undoRemoveAlert({ orgao, token, alertId }) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axios.post(
      UNDO_DELETE_ALERT({ orgao, alertId }),
      formData,
      buildRequestConfig(token),
    );
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
  async function getInvestigatedProfile({ token, organTypeName, representanteDk, pessDk }) {
    const params = { jwt: token };

    if (pessDk) {
      params.pess_dk = pessDk;
    }

    if (organTypeName === 'tutela') {
      params.orgao_type = organTypeName;
    }

    const { data } = await axios.get(INVESTIGATED_PROFILE_URL({ representanteDk }), { params });
    return investigatedProfileTransform(data);
  }

  async function getRadarCompareData({ orgao, organType, token }) {
    const endpoint =
      organType === 1 ? RADAR_COMPARE_TUTELA({ orgao }) : RADAR_COMPARE_PIP({ orgao });
    const { data } = await axios.get(endpoint, buildRequestConfig(token));

    return radarCompareTransform(data);
  }

  async function getAlertOverlayData(docDk, type, { token }) {
    const params = { tipo: type.toLocaleLowerCase(), jwt: token };

    const { data } = await axios.get(ALERT_OVERLAY_DATA({ docDk }), { params });
    return alertOverlayTransform(type, data);
  }

  async function sendOmbudsmanEmail(link) {
    const formData = new FormData();
    return axios.post(link, formData);
  }

  async function getProcessDetail({ num_doc, token }) {
    const params = { jwt: token };
    const { data } = await axios.get(PROCESS_DETAIL({ num_doc }), { params });
    return processDetailTransform(data);
  }

  return {
    login,
    scaLogin,
    getTodayOutData,
    getTodayOutliersData,
    getTodayEntriesData,
    getOpenCasesDetails,
    getOpenInvestigationsDetails,
    getCourtCasesDetails,
    getOpenCasesList,
    getRadarData,
    getAlerts,
    getAlertsCount,
    getHiresAlerts,
    getProcessingTimeData,
    getProcessList,
    getsuccessIndicators,
    getPipRadarData,
    getIntegratedDeskDocs,
    getIntegratedDeskDetails,
    getMainInvestigated,
    actionMainInvestigated,
    removeAlert,
    undoRemoveAlert,
    getInvestigatedProfile,
    getRadarCompareData,
    getOngoingInvestigationsList,
    sendOmbudsmanEmail,
    getAlertOverlayData,
    getProcessDetail,
  };
})();

export default Api;
