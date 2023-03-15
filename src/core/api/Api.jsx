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
} from './endpoints';
import {
  scaUserTransform,
  jwtUserTransform,
  todayOutTransform,
  todayOutliersTransform,
  todayEntriesTransform,
  openCasesDetailsTransform,
  deskIntegratedTransform,
  deskTabTransform
} from './transforms';

import { formatDateObjForBackend } from '../../web/utils/formatters';

const buildRequestConfig = (jwt) => ({ params: { jwt } });

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

  async function getIntegratedDeskDocs({ orgao, token, cpf, docType }) {
    const { data } = await axios.get(
      DESK_INTEGRATED({ orgao, cpf, docType }),
      buildRequestConfig(token),
    );

    return deskIntegratedTransform(data);
  }

  async function getIntegratedDeskDetails({ orgao, token, cpf, docType, type }) {
    const { data } = await axios.get(
      DESK_DETAIL_INTEGRATED({ orgao, cpf, docType, type }),
      buildRequestConfig(token),
    );

    return deskTabTransform(data);
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
  };
}

export default ApiCreator;
