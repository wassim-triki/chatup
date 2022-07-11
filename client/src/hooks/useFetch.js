import { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import axios from '../api/axiosConfig';
// import axios from 'axios';

const useFetch = (url, dependencies = []) => {
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
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
