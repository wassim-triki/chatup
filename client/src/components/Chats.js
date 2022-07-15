import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import useFetch from '../hooks/useFetch';
import ChatItem from './ChatItem';
import useSocket from '../context/SocketContext/SocketState';
import useChat from '../context/ChatContext/ChatState';

const Contacts = () => {
  const { auth, acceptedRequest } = useAuth();
  const { socket, receiveAcceptedChat } = useSocket();
  const { setChats, addToChats, chats } = useChat();
  const { data, error, loading } = useFetch('/chat/myChats', [auth]);

  useEffect(() => {
    setChats(data);
  }, [data]);

  useEffect(() => {
    receiveAcceptedChat((chat) => setChats((c) => [chat, ...c]));
  }, [socket]);

  return (
    <div className="box   font-fira overflow-y-auto scrollbar">
      {chats?.length ? (
        chats.map((chat) => <ChatItem key={chat._id} chat={chat} />)
      ) : (
        <p className="text-gray-default  mx-auto my-auto">No contacts yet...</p>
      )}
    </div>
  );
};

export default Contacts;
