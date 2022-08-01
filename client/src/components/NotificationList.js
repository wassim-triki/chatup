import React, { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import useFetch from '../hooks/useFetch';
import NotificationItem from './NotificationItem';
import Spinner from './Spinner';
import axios from '../api/axiosConfig';
import { toast } from 'react-toastify';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
const NotificationList = ({ listRef }) => {
  const { auth } = useAuth();
  const notificationIds = auth.user.receivedRequests;
  const { data, error, loading } = useFetch('/users/requests', [auth]);
  const { isDark } = useDarkMode();
  return (
    <div
      ref={listRef}
      className={`dropdown lg:min-w-[250px]  min-h-[60px] max-h-[calc(100vh-80px)] overflow-y-auto scrollbar z-10 ${
        isDark && 'bg-dark-100'
      } w-[96%] top-14 left-1/2 -translate-x-[50%] lg:top-11 lg:left-auto lg:-translate-x-0 gap-2`}
    >
      {data?.length ? (
        data?.reverse().map((u) => <NotificationItem key={u._id} {...u} />)
      ) : (
        <p className="text-center text-sm text-gray-default m-auto">
          {loading ? (
            <Spinner size="2xl" center={true} fill="green-light" />
          ) : (
            'Nothing here.'
          )}
        </p>
      )}
    </div>
  );
};

export default NotificationList;
