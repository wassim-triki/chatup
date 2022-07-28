import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import useSocket from '../context/SocketContext/SocketState';
import useAuth from '../context/UserContext/UserState';
import useFetch from '../hooks/useFetch';
import { Main } from '../layout/Main';

const Home = () => {
  return (
    <div className="h-screen w-full bg-gray-light px-[300px] flex flex-col">
      <Header />
      <Main />
      {/* {data && data?.map(({ email }) => <li key={email}>{email}</li>)} */}
    </div>
  );
};

export default Home;
