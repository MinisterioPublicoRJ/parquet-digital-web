import axios from 'axios';

import { BASE_URL, SCA_LOGIN } from './endpoints';

function Api() {
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

    const res = await axios.post(SCA_LOGIN, formData);
    console.log('res', res);
    // return scaUserTranform(data);
  }

  return {
    loginWithSCACredentials,
  };
}

export default Api();
