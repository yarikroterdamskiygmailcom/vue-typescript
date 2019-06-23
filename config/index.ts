import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'https://charttool-api-server.services.digdis.app/api/v1',
});

HTTP.interceptors.request.use((config): any => {
  try {
    if (localStorage.getItem('jwt') && localStorage.getItem('contract_id')) {
      config.headers.Authorization = localStorage.getItem('jwt');
      config.headers.contractId = localStorage.getItem('contract_id');
    }

    return config;
  } catch (error) {
    console.log(error);
  }
});

export default HTTP;
