import React, { useEffect } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { RiArrowDownSLine } from 'react-icons/ri';
import useAuth from '../context/UserContext/UserState';
import UserContainer from './UserContainer';
import NotificationsContainer from './NotificationsContainer';
const Header = () => {
  return (
    <header className=" h-20 flex items-center text-gray-dark font-fira mb-10">
      <div className="flex items-center">
        <BsFillChatDotsFill className="text-3xl text-green-dark" />
        <span className="font-cairo font-bold text-xl">ChatUP</span>
      </div>
      <div className="ml-auto flex items-center gap-5">
        <NotificationsContainer />
        <UserContainer />
      </div>
    </header>
  );
};

export default Header;
