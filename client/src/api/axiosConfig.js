import axios from 'axios';

const IN_DEV = process.env.REACT_APP_PRODUCTION || 'http://localhost:8080/api';
const IN_PROD = '/api';
const BASE_URL = IN_DEV;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
