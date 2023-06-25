import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.92:3333/api/v1',
  timeout: 10000
});

export default api;
