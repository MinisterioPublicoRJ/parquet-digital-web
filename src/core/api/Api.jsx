import axios from 'axios';

function Api() {
  const axiosInstance = axios.create();

  function addHeaders(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return {};
}

export default Api();
