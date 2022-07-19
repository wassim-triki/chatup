import axios from 'axios';

const DEV = 'http://localhost:8080/api';
const PROD = '/api';
const BASE_URL = DEV;

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default instance;
