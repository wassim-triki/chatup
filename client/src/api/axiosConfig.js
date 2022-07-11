import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_PRODUCTION || 'http://localhost:8080/api';

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
