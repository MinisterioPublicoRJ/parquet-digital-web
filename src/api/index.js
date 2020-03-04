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
  todayOutTransform,
  todayOutliersTransform,
  todayEntriesTransform,
} from './transforms';

const Api = (() => {
  /**
   * fetches percentage info for the Today page from the backend
   * @param  {string} id promotoria's id
   * @return {number}    [description]
   */
  async function getTodayOutData(id) {
    const { data } = await axios.get(TODAY_OUT({ id }));

    return todayOutTransform(data);
  }

  /**
   * fetches acervo info for the Today page from the backend
   * @param  {string} id promotoria's id
   * @param  {date} date day you want tinfo from
   * @return {json}      { acervoQtd: Number, primQ: Number, mediana, terQ: Number, cod: number }
   */
  async function getTodayOutliersData(id, date) {
    const dateFormated = formatDateObjForBackend(date);
    const { data } = await axios.get(TODAY_OUTLIERS({ id, date: dateFormated }));

    return todayOutliersTransform(data);
  }

  async function getTodayEntriesData(id, cpf) {
    const { data } = await axios.get(TODAY_ENTRIES({ id, cpf }));

    return todayEntriesTransform(data);
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
    getTodayOutliersData,
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
