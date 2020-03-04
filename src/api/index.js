import axios from 'axios';

import {
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
} from './transforms';

const Api = (() => {
  /**
   * fetches percentage info for the Today page from the backend
   * @param  {string} id promotoria's id
   * @return {number}    [description]
   */
  async function getTodayOutData(id) {
    let response;
    try {
      response = await axios.get(`${TODAY_OUT}/${id}`);
    } catch (e) {
      response = { data: { percent_rank: 0 } };
      console.log('getTodayOutData error: ', e);
    }
    return response.data.percent_rank;
  }

  /**
   * fetches acervo info for the Today page from the backend
   * @param  {string} id promotoria's id
   * @param  {date} date day you want tinfo from
   * @return {json}      { acervoQtd: Number, primQ: Number, mediana, terQ: Number, cod: number }
   */
  async function getTodayCollectionData(id, date) {
    const dateFormated = formatDateObjForBackend(date);
    let resObj = {};
    try {
      const res = await axios.get(`${TODAY_OUTLIERS}/${id}/${dateFormated}`);
      resObj = {
        acervoQtd: res.data.acervo_qtd,
        primQ: res.data.primeiro_quartil,
        mediana: res.data.mediana,
        terQ: res.data.terceiro_quartil,
        cod: res.data.cod_atribuicao,
      };
    } catch (e) {
      resObj.error = true;
      console.log('getTodayCollectionData error: ', e);
    }
    return resObj;
  }

  async function getTodayEntriesData(id, cpf) {
    let resObj = {};
    try {
      const res = await axios.get(`${TODAY_ENTRIES}/${id}/${cpf}`);
      resObj = {
        hout: res.data.hout,
        lout: res.data.lout,
        numEntries: res.data.nr_entradas_hoje,
      };
    } catch (e) {
      resObj.error = true;
      console.log('getTodayEntriesData error: ', e);
    }
    return resObj;
  }

  async function getOpenCases(id, cpf) {
    const { data } = await axios.get(OPEN_CASES_URL({ id, cpf }));

    return openCasesTransform(data);
  }

  async function getOpenCasesDetails(id, cpf) {
    const { data } = await axios.get(OPEN_CASES_DETAILS_URL({ id, cpf }));

    return openCasesDetailsTransform(data);
  }

  async function getOpenInvestigations(id) {
    const { data } = await axios.get(OPEN_INVESTIGATIONS_URL({ id }));

    return openInvestigationsTransform(data);
  }

  async function getOpenInvestigationsDetails(id) {
    const { data } = await axios.get(OPEN_INVESTIGATIONS_DETAILS_URL({ id }));

    return openInvestigationsDetailsTransform(data);
  }

  async function getCourtCases(id) {
    const { data } = await axios.get(COURT_CASES_URL({ id }));

    return courtCasesTransform(data);
  }

  async function getCourtCasesDetails(id) {
    const { data } = await axios.get(COURT_CASES_DETAILS_URL({ id }));

    return courtCasesDetailsTransform(data);
  }

  async function getClosedCases(id) {
    const { data } = await axios.get(CLOSED_CASES_URL({ id }));

    return closedCasesTransform(data);
  }

  return {
    getTodayOutData,
    getTodayCollectionData,
    getTodayEntriesData,
    getOpenCases,
    getOpenCasesDetails,
    getOpenInvestigations,
    getCourtCases,
    getClosedCases,
    getOpenInvestigationsDetails,
    getCourtCasesDetails,
  };
})();

export default Api;
