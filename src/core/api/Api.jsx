import axios from 'axios';

import { BASE_URL, SCA_LOGIN, TOKEN_LOGIN, TODAY_OUT, TODAY_OUTLIERS, TODAY_ENTRIES } from './endpoints';
import {scaUserTransform, jwtUserTransform, todayOutTransform, todayOutliersTransform, todayEntriesTransform} from './transforms'

import { formatDateObjForBackend } from '../../web/utils/formatters';


const buildRequestConfig = (jwt) => ({ params: { jwt } });


function ApiCreator() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  function addHeaders(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async function loginWithSCACredentials(username, password) {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);

    const {data} = await axiosInstance.post(SCA_LOGIN, formData);
    const {token, cpf, orgao_selecionado} = data;
    axiosInstance.defaults.params = {jwt: token};
    
    return scaUserTransform(data);
  }

  
  async function loginWithJwtCredentials(token) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axiosInstance.post(TOKEN_LOGIN, formData);

    return jwtUserTransform(data);
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




  return {
    loginWithSCACredentials,
    loginWithJwtCredentials,
    getTodayOutData,
    getTodayOutliersData,
    getTodayEntriesData
  };
}

export default ApiCreator;
