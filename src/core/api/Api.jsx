import axios from 'axios';

import { BASE_URL, SCA_LOGIN } from './endpoints';

function ApiCreator() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  function addHeaders(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async function loginWithSCACredentials(username, password) {
    console.log('loggin in');
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);

    const res = await axiosInstance.post(SCA_LOGIN, formData);
    const {token, cpf, orgao_selecionado} = res.data;
    console.log('token: ', token, '\ncpf: ', cpf, 'orgao_selecionado: ', orgao_selecionado);
    axiosInstance.defaults.params = {jwt: token};
    console.log('res', res);
    
    const request = await axiosInstance.get(`/pip/principais-investigados/${orgao_selecionado.cdorgao}/${cpf}`);
    console.log("request: ",request);
    // return scaUserTranform(data);
  }

  return {
    loginWithSCACredentials,
  };
}

export default ApiCreator;
