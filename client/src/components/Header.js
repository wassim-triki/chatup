import React, { useEffect } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import useAuth from '../context/UserContext/UserState';
import UserContainer from './UserContainer';
import NotificationsContainer from './NotificationsContainer';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
const Header = () => {
  const { isDark } = useDarkMode();
  return (
    <header
      className={` h-20 flex items-center  ${
        isDark ? 'text-white' : 'text-gray-dark'
      } font-fira mb-10 `}
    >
      <div className="flex items-center gap-1">
        {/* <BsFillChatDotsFill className="text-3xl text-green-dark" /> */}
        <img
          className="h-8"
          src={require('../assets/images/logo192.png')}
          alt=""
        />
        <span className="font-ds font-bold text-2xl ">ChatUP</span>
      </div>
      <div className="ml-auto flex items-center gap-5">
        <NotificationsContainer />
        <UserContainer />
      </div>
    </header>
  );
};

export default Header;
