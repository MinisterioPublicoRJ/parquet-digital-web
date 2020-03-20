import axios from 'axios';

import {
  LOGIN_URL,
  TODAY_OUT,
  TODAY_OUTLIERS,
  TODAY_ENTRIES,
  OPEN_CASES_URL,
  OPEN_CASES_DETAILS_URL,
  OPEN_INVESTIGATIONS_URL,
  COURT_CASES_URL,
  CLOSED_CASES_URL,
  COURT_CASES_DETAILS_URL,
  OPEN_INVESTIGATIONS_DETAILS_URL,
  OPEN_CASES_LIST,
  RADAR_DATA,
  ALERTS_LIST,
} from './endpoints';

import { formatDateObjForBackend } from '../utils/formatters';
import {
  openInvestigationsTransform,
  openInvestigationsDetailsTransform,
  openCasesTransform,
  openCasesDetailsTransform,
  courtCasesTransform,
  courtCasesDetailsTransform,
  closedCasesTransform,
  todayOutTransform,
  todayOutliersTransform,
  todayEntriesTransform,
  openCasesListTransform,
  radarTransform,
  alertsTransform,
} from './transforms';

import { setUser } from '../user';

const buildRequestConfig = jwt => ({ params: { jwt } });

const Api = (() => {
  async function login(token) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axios.post(LOGIN_URL, formData);

    setUser(data);
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

  async function getOpenCases({ orgao, cpf, token }) {
    const { data } = await axios.get(OPEN_CASES_URL({ orgao, cpf }), buildRequestConfig(token));

    return openCasesTransform(data);
  }

  async function getOpenCasesDetails({ orgao, cpf, token }) {
    const { data } = await axios.get(
      OPEN_CASES_DETAILS_URL({ orgao, cpf }),
      buildRequestConfig(token),
    );

    return openCasesDetailsTransform(data);
  }

  async function getOpenInvestigations({ orgao, token }) {
    const { data } = await axios.get(OPEN_INVESTIGATIONS_URL({ orgao }), buildRequestConfig(token));

    return openInvestigationsTransform(data);
  }

  async function getOpenInvestigationsDetails({ orgao, token }) {
    const { data } = await axios.get(
      OPEN_INVESTIGATIONS_DETAILS_URL({ orgao }),
      buildRequestConfig(token),
    );

    return openInvestigationsDetailsTransform(data);
  }

  async function getCourtCases({ orgao, token }) {
    const { data } = await axios.get(COURT_CASES_URL({ orgao }), buildRequestConfig(token));

    return courtCasesTransform(data);
  }

  async function getCourtCasesDetails({ orgao, token }) {
    const { data } = await axios.get(COURT_CASES_DETAILS_URL({ orgao }), buildRequestConfig(token));

    return courtCasesDetailsTransform(data);
  }

  async function getClosedCases({ orgao, token }) {
    const { data } = await axios.get(CLOSED_CASES_URL({ orgao }), buildRequestConfig(token));

    return closedCasesTransform(data);
  }

  async function getOpenCasesList({ orgao, cpf, token }, list) {
    const { data } = await axios.get(
      OPEN_CASES_LIST({ orgao, cpf, list }),
      buildRequestConfig(token),
    );

    return openCasesListTransform(data);
  }

  async function getRadarData({ orgao, token }) {
    const { data } = await axios.get(RADAR_DATA({ orgao }), buildRequestConfig(token));

    return radarTransform(data);
  async function getAlertsList(id) {
    // const { data } = await axios.get(ALERTS_LIST({ id }));
    const data = [
      {
        sigla: 'SIGLA 1',
        descricao: 'Descrição 1',
        doc_dk: 12345678,
        num_doc: '123456789',
        num_ext: null,
        etiqueta: 'ETIQUETA 1',
        classe_doc: 'Classe Doc 1',
        data_alerta: '2016-12-06T00:00:00Z',
        orgao: 123456,
        classe_hier: 'CLASSE|HIERARQUIA',
        dias_passados: -1,
      },
      {
        sigla: 'SIGLA 2',
        descricao: 'Descrição 2',
        doc_dk: 12345678,
        num_doc: '123456789',
        num_ext: null,
        etiqueta: 'ETIQUETA 2',
        classe_doc: 'Classe Doc 2',
        data_alerta: '2016-12-06T00:00:00Z',
        orgao: 123456,
        classe_hier: 'CLASSE|HIERARQUIA',
        dias_passados: -1,
      },
    ];
    return alertsTransform(data);
  }

  return {
    login,
    getTodayOutData,
    getTodayOutliersData,
    getTodayEntriesData,
    getOpenCases,
    getOpenCasesDetails,
    getOpenInvestigations,
    getCourtCases,
    getClosedCases,
    getOpenInvestigationsDetails,
    getCourtCasesDetails,
    getOpenCasesList,
    getRadarData,
  };
})();

export default Api;
