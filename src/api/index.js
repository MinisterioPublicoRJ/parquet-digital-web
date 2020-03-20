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

  async function getRadarData(id) {
    const { data } = await axios.get(RADAR_DATA({ id }));
    // EM CASO DE PROBLEMAS COM A AUTENTICAÇAO, USE ESSE MOCK
    // const data = {
    //   pacote_atribuicao: 'Tutela Coletiva - Meio Ambiente',
    //   orgao_id: 400552.0,
    //   nr_arquivamentos: 179,
    //   nr_indeferimentos: 25,
    //   nr_instauracoes: 12,
    //   nr_tac: 0,
    //   nr_acoes: 0,
    //   dt_calculo: '2020-03-09T14:50:11.324000',
    //   codigo_pacote: 28,
    //   max_pacote_arquivamentos: 278,
    //   max_pacote_indeferimentos: 151,
    //   max_pacote_instauracoes: 65,
    //   max_pacote_tac: 10,
    //   max_pacote_acoes: 21,
    //   med_pacote_aquivamentos: 149,
    //   med_pacote_tac: 3,
    //   med_pacote_indeferimentos: 70,
    //   med_pacote_instauracoes: 32,
    //   med_pacote_acoes: 4,
    //   perc_arquivamentos: 64.38848920863309,
    //   perc_tac: 0.0,
    //   perc_indeferimentos: 16.55629139072848,
    //   perc_instauracoes: 18.461538461538463,
    //   perc_acoes: 0.0,
    //   var_med_arquivamentos: 0.20134228187919462,
    //   var_med_tac: 0.0,
    //   var_med_indeferimentos: -0.6428571428571429,
    //   var_med_instauracoes: -0.625,
    //   var_med_acoes: 0.0,
    // };

    return radarTransform(data);
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
