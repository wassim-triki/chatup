import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import getChatUser from '../helpers/getChatUser';
import getFullName from '../helpers/getFullName';
import truncateStr from '../helpers/truncateStr';
import useSocket from '../context/SocketContext/SocketState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import UserPicContainer from './UserPicContainer';
import { toast } from 'react-toastify';

const ContactItem = ({ chat }) => {
  const { setOpenChat, openChat, messages, setChats, chats } = useChat();
  const { auth } = useAuth();
  const { isDark } = useDarkMode();
  const [chatUser, setChatUser] = useState(null);
  const [latestMessage, setLatestMessage] = useState(chat.latestMessage);

  useEffect(() => {
    if (messages[messages.length - 1]?.chat === chat._id) {
      setLatestMessage(messages[messages.length - 1]);
    }
  }, [messages]);

  useEffect(() => {
    // setChats([chat, ...chats.filter((c) => c._id === chat._id)]);
  }, [latestMessage]);
  useEffect(() => {
    !chat.isGroupChat && setChatUser(getChatUser(auth.user, chat.users));
  }, [chat]);

  const handleClick = async (e) => {
    try {
      if (chat._id === openChat?.chat?._id) {
        return;
      } else {
        const resp = await axios.get(`/chat/${chat._id}`);
        setOpenChat({ chat: resp.data, chatMessages: [] });
      }
    } catch (error) {
      toast(error.response.data.message, { type: 'error' });
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex gap-3 cursor-pointer relative  p-3 mb-2 last-of-type:mb-0 rounded-2xl self-stretch font-poppins w-full ${
        isDark ? 'hover:bg-dark-80' : 'hover:bg-gray-100'
      }`}
    >
      <div className="relative w-min self-start ">
        <UserPicContainer
          pic={chatUser ? chatUser.picture : chat.groupPic}
          isOnline={chat.isOnline}
        />
      </div>
      <div className={` flex flex-col flex-[4]  gap-1 overflow-hidden `}>
        <div
          className={` ${
            isDark ? 'text-white' : 'text-gray-dark'
          } text-md font-normal whitespace-nowrap overflow-hidden text-ellipsis`}
        >
          {chatUser ? getFullName(chatUser) : chat.chatName}
        </div>

        <p
          className={`text-[13px] whitespace-nowrap overflow-hidden text-ellipsis  ${
            isDark ? 'text-dark-70' : 'text-gray-400'
          }`}
        >
          {latestMessage && latestMessage.images.length > 0
            ? latestMessage.sender === auth.user._id
              ? 'You sent a photo'
              : getFullName(chatUser || '').split(' ')[0] + ' sent a photo'
            : latestMessage && latestMessage.sender === auth.user._id
            ? 'You: ' + latestMessage?.content
            : latestMessage?.content}
          {!latestMessage?.content &&
            !latestMessage?.images &&
            'No messages yet.'}
        </p>
      </div>
      <div
        className={`font-medium text-right text-sm flex-1  ${
          isDark ? 'text-dark-70' : 'text-gray-dark'
        } `}
      >
        {dateToTime(latestMessage?.createdAt) || dateToTime(chat.createdAt)}
      </div>
    </div>
  );
};

export default ContactItem;
