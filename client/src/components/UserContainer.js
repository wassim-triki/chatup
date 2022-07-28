import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../context/UserContext/UserState';
import fetchData from '../helpers/fetchData';
import { useClickAway } from 'react-use';
import useSocket from '../context/SocketContext/SocketState';
import { BiUserCircle } from 'react-icons/bi';
import { CgDarkMode } from 'react-icons/cg';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import UserMenu from './UserMenu';

const UserContainer = () => {
  const { auth, logoutUser } = useAuth();
  const [show, setShow] = useState(false);
  const { socket, disconnectUser } = useSocket();
  const { isDark, toggleDarkMode } = useDarkMode();
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShow(false);
  });

  return (
    <div className="hover:bg-gray-300 active:bg-gray-400   justify-center   cursor-pointer rounded-full gap-1  flex items-center   relative">
      <div
        onClick={(e) => setShow(true)}
        className=" group w-9 h-9 rounded-full overflow-hidden"
      >
        <img
          className=" group-hover:opacity-70 w-full h-full object-cover object-center"
          src={auth?.user?.picture}
          alt=""
        />
      </div>
      {/* {auth.user.firstName + ' ' + auth.user.lastName} */}
      {show && <UserMenu myRef={ref} />}
    </div>
  );
};

export default UserContainer;
