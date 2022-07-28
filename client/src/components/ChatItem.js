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

const ContactItem = ({ chat }) => {
  const { setOpenChat, openChat, messages } = useChat();
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
      console.log(error.message);
    }
  };
  return (
    <div
      onClick={handleClick}
      className={`flex gap-3 justify-between cursor-pointer relative hover:bg-gray-100 p-3 mb-2 last-of-type:mb-0 rounded-2xl self-stretch font-poppins ${
        isDark && 'hover:bg-dark-80'
      }`}
    >
      <div className="relative w-min self-start ">
        <div className="w-12 h-12 rounded-full overflow-hidden ">
          <img
            className="object-cover object-center"
            src={chatUser ? chatUser.picture : chat.groupPic}
            alt=""
          />
        </div>
        {chat.isOnline && (
          <div className="absolute w-[13px] h-[13px] border-2 border-white bg-green-light right-0 bottom-0 rounded-full"></div>
        )}
      </div>
      <div className={` flex flex-col flex-1  gap-1 whitespace-nowrap`}>
        <div
          className={` ${
            isDark ? 'text-white' : 'text-gray-dark'
          } text-md font-normal`}
        >
          {chatUser ? getFullName(chatUser) : chat.chatName}
        </div>

        <p
          className={`text-[13px]  ${
            isDark ? 'text-dark-70' : 'text-gray-400'
          }`}
        >
          {latestMessage && latestMessage.sender === auth.user._id
            ? 'You: '
            : ''}
          {truncateStr(latestMessage?.content, 18) || 'No messages yet.'}
        </p>
      </div>
      <div
        className={`font-medium text-sm ${
          isDark ? 'text-dark-70' : 'text-gray-dark'
        } `}
      >
        {dateToTime(latestMessage?.createdAt) || ''}
      </div>
    </div>
  );
};

export default ContactItem;
