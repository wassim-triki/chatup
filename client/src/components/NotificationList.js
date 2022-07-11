import React, { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import useFetch from '../hooks/useFetch';
import NotificationItem from './NotificationItem';
import Spinner from './Spinner';
import axios from '../api/axiosConfig';
import { toast } from 'react-toastify';
const NotificationList = ({ listRef }) => {
  const { auth } = useAuth();
  const notificationIds = auth.user.receivedRequests;
  const { data, error, loading } = useFetch('/users/requests', [
    notificationIds,
  ]);

  return (
    <div
      ref={listRef}
      className="dropdown min-w-[250px] min-h-[60px] max-h-[calc(100vh-200%)] overflow-y-auto scrollbar z-10"
    >
      {data?.length ? (
        data?.map((u) => <NotificationItem key={u._id} {...u} />)
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
