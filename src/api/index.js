import axios from 'axios';

import { TODAY_OUT, TODAY_OUTLIERS, TODAY_ENTRIES } from './endpoints';

import { formatDateObjForBackend } from '../utils/formatters';

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

  return {
    getTodayOutData,
    getTodayCollectionData,
    getTodayEntriesData,
  };
})();

export default Api;
