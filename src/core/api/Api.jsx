import axios from 'axios';

import { BASE_URL, SCA_LOGIN, TOKEN_LOGIN } from './endpoints';
import {scaUserTransform, jwtUserTransform} from './transforms'

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
    console.log('token: ', token, '\ncpf: ', cpf, 'orgao_selecionado: ', orgao_selecionado);
    axiosInstance.defaults.params = {jwt: token};
    
    return scaUserTransform(data);
  }

  
  async function loginWithJwtCredentials(token) {
    const formData = new FormData();
    formData.set('jwt', token);

    const { data } = await axiosInstance.post(TOKEN_LOGIN, formData);

    return jwtUserTransform(data);
  }


  return {
    loginWithSCACredentials,
    loginWithJwtCredentials,
  };
}

export default ApiCreator;
