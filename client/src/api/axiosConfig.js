import axios from 'axios';

const IN_DEV = 'http://localhost:8080/api';
const IN_PROD = '/api';
const BASE_URL = IN_PROD;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
