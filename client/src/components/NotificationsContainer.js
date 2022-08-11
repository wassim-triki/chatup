import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import { VscBell } from 'react-icons/vsc';
import { useClickAway } from 'react-use';
import useFetch from '../hooks/useFetch';
import { last } from 'lodash';
import NotificationItem from './NotificationItem';
import NotificationList from './NotificationList';
import useSocket from '../context/SocketContext/SocketState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
const NotificationsContainer = () => {
  const { socket, receiveNotification } = useSocket();
  const { auth, receiveRequest } = useAuth();
  const [notif, setNotif] = useState(null);
  const { isDark } = useDarkMode();
  const [show, setShow] = useState(false);
  useEffect(() => {
    receiveNotification(receiveRequest);
  }, [socket]);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setShow(false);
  });
  const handleClick = (e) => {
    setShow(!show);
  };

  return (
    <div
      onClick={handleClick}
      className={`hover:bg-gray-200 ${isDark && 'hover:bg-dark-90 '} ${
        !isDark && 'active:bg-gray-300'
      } cursor-pointer rounded-full w-9 h-9 flex justify-center items-center md:relative `}
    >
      <VscBell className="text-2xl text-center" />
      {auth.user.receivedRequests.length ? (
        <div className="absolute w-3 h-3 bg-orange-default rounded-full top-5 right-[70px] md:top-1 md:right-[5px]"></div>
      ) : (
        ''
      )}
      {show && <NotificationList listRef={ref} />}
      {notif && <h1>{notif}</h1>}
    </div>
  );
};

export default NotificationsContainer;
