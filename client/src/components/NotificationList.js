import React, { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import useFetch from '../hooks/useFetch';
import NotificationItem from './NotificationItem';
import Spinner from './Spinner';
import axios from '../api/axiosConfig';
import { toast } from 'react-toastify';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import { ThreeDots } from 'react-loader-spinner';
const NotificationList = ({ listRef }) => {
  const { auth } = useAuth();
  const notificationIds = auth.user.receivedRequests;
  const { data, error, loading } = useFetch('/users/requests', [auth]);
  const { isDark } = useDarkMode();
  return (
    <div
      ref={listRef}
      className={`dropdown md:w-[300px]  min-h-[60px] max-h-[calc(100vh-95px)] overflow-x-hidden overflow-y-auto scrollbar z-10 ${
        isDark && notificationIds.length && 'bg-dark-100'
      } ${
        isDark && !notificationIds.length && 'bg-dark-90'
      } w-[96%] top-14 left-1/2 -translate-x-[50%] md:top-11 md:left-auto md:-translate-x-0 gap-2`}
    >
      {data?.length ? (
        data?.reverse().map((u) => <NotificationItem key={u._id} {...u} />)
      ) : (
        <p className="text-center text-sm text-gray-default m-auto">
          {loading ? (
            <ThreeDots color="#3cc6b7" height={28} width={28} />
          ) : (
            'Nothing here.'
          )}
        </p>
      )}
    </div>
  );
};

export default NotificationList;
