import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';

const fetchData = async (url, method = 'GET', payload = null) => {
  try {
    let resp;
    switch (method) {
      case 'POST':
        resp = await axios.post(url, payload);
        break;
      case 'PUT':
        resp = await axios.put(url, payload);
        break;
      default:
        resp = await axios.get(url);
    }
    return resp;
  } catch (error) {
    return error;
  }
};

export default fetchData;
