import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../context/UserContext/UserState';
import fetchData from '../helpers/fetchData';
import { useClickAway } from 'react-use';
import useSocket from '../context/SocketContext/SocketState';
const UserContainer = () => {
  const { auth, logoutUser } = useAuth();
  const [show, setShow] = useState(false);
  const { socket, disconnectUser } = useSocket();
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShow(false);
  });

  const handleLogout = async () => {
    const resp = await fetchData('/auth/logout');
    const { data, message: error } = resp;
    data && toast(data.message, { type: 'success' });
    logoutUser();
  };
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
      {auth.user.firstName + ' ' + auth.user.lastName}
      {show && (
        <div ref={ref} className=" w-48 p-2 dropdown text-sm">
          <div
            onClick={handleLogout}
            className="hover:bg-gray-100 rounded-lg p-2"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContainer;
