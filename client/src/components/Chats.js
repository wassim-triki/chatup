import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import useFetch from '../hooks/useFetch';
import ChatItem from './ChatItem';
import useSocket from '../context/SocketContext/SocketState';
import useChat from '../context/ChatContext/ChatState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import { IoPeopleOutline } from 'react-icons/io5';

const Contacts = () => {
  const { auth, acceptedRequest } = useAuth();
  const { isDark } = useDarkMode();
  const { socket, receiveAcceptedChat, receiveMessage, getUserOnlineStatus } =
    useSocket();
  const { chats, setChats } = useChat();
  const { data, error, loading } = useFetch('/chat/myChats', [auth]);

  useEffect(() => {
    setChats(data);
  }, [data]);

  useEffect(() => {
    receiveAcceptedChat((chat) => setChats((c) => [chat, ...c]));
  }, [socket]);

  return (
    <div
      className={`box ${
        isDark && 'bg-dark-90 '
      }  font-fira overflow-y-auto scrollbar overflow-x-hidden`}
    >
      {chats?.length ? (
        chats.map((chat) => <ChatItem key={chat._id} chat={chat} />)
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <IoPeopleOutline
            className={`text-9xl ${isDark ? 'text-dark-80' : 'text-light-80'}`}
          />
          <p
            className={`${
              isDark ? 'text-dark-75' : 'text-light-75'
            } font-normal text-lg`}
          >
            No Chats.
          </p>
        </div>
      )}
    </div>
  );
};

export default Contacts;
