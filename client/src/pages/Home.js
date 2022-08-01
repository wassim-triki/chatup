import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import useSocket from '../context/SocketContext/SocketState';
import useAuth from '../context/UserContext/UserState';
import useFetch from '../hooks/useFetch';
import { Main } from '../layout/Main';

const Home = () => {
  const { isDark } = useDarkMode();
  return (
    <div
      className={`h-screen w-full bg-gray-light ${
        isDark && 'bg-dark-100'
      } px-2  sm:bg-gresen-500 md:bg-bslue-500  lg:bg-rsed-500 2xl:bg-yelslow-500  lg:[100px] 2xl:px-[200px] flex flex-col`}
    >
      <Header />
      <Main />
    </div>
  );
};

export default Home;
