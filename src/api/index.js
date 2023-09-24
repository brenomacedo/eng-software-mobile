import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://pickapal-backend.onrender.com/api/v1',
//   timeout: 10000
// });

const api = axios.create({
  baseURL: 'http://10.0.0.105:3333/api/v1'
});

export default api;
