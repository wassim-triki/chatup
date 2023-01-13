import axios from 'axios';

const DEV = 'http://localhost:8080/api';
const BASE_URL = 'https://chatup-production.up.railway.app/api';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
