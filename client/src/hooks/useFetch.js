import { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import axios from '../api/axiosConfig';
// import axios from 'axios';

const useFetch = (url, dependencies = [], method = 'GET', payload = null) => {
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp;
        switch (method) {
          case 'GET':
            resp = await axios.get(url);
            break;
          case 'POST':
            resp = await axios.post(url, payload);
            break;
          default:
            return;
        }
        setData(resp.data);
      } catch ({ response }) {
        setError(response.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, dependencies);
  return { data, error, loading };
};

export default useFetch;
