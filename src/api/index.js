import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pickapal-backend.onrender.com/api/v1',
  timeout: 10000
});

export default api;
