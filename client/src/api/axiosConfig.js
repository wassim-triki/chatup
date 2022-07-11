import axios from 'axios';

const BASE_URL =
  'https://app-chatup.herokuapp.com' || 'http://localhost:8080/api';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// instance.interceptors.request.use(
//   (config) => {
//     config.withCredentials = true;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default instance;
