import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import useFetch from '../hooks/useFetch';
import ContactItem from './ContactItem';
import useSocket from '../context/SocketContext/SocketState';

const Contacts = () => {
  const { auth, acceptedRequest } = useAuth();
  const { socket } = useSocket();
  const { data, error, loading } = useFetch('/chats', [], 'POST', {
    _id: auth.user._id,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    acceptedRequest();
  }, [socket]);
  return (
    <div className="box   font-fira overflow-y-auto scrollbar">
      {data?.length ? (
        data?.map((contact) => <ContactItem key={contact._id} data={contact} />)
      ) : (
        <p className="text-gray-default  mx-auto my-auto">No contacts yet...</p>
      )}
    </div>
  );
};

export default Contacts;
