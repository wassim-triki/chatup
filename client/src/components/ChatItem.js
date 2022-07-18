import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import getChatUser from '../helpers/getChatUser';
import getFullName from '../helpers/getFullName';
import truncateStr from '../helpers/truncateStr';
import { Link, useLocation } from 'react-router-dom';

const ContactItem = ({ lastDate, lastMessage, isOnline, chat }) => {
  const { chats, setOpenChat, openChat } = useChat();
  const { auth } = useAuth();
  const [chatUser, setChatUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    !chat.isGroupChat && setChatUser(getChatUser(auth.user, chat.users));
    console.log(chat);
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
    <Link to={`/${chat._id}`}>
      <div
        onClick={handleClick}
        className={`flex gap-3 justify-between cursor-pointer relative hover:bg-gray-100 p-3 mb-2 last-of-type:mb-0 rounded-2xl self-stretch`}
      >
        <div className="relative w-min self-start ">
          <div className="w-12 h-12 rounded-full overflow-hidden ">
            <img
              className="object-cover object-center"
              src={chatUser ? chatUser.picture : chat.groupPic}
              alt=""
            />
          </div>
          {isOnline && (
            <div className="absolute w-[13px] h-[13px] border-2 border-white bg-green-light right-0 bottom-0 rounded-full"></div>
          )}
        </div>
        <div
          className={` flex flex-col flex-1 font-fira gap-1 whitespace-nowrap`}
        >
          <div className="text-gray-dark text-lg font-normal ">
            {chatUser ? getFullName(chatUser) : chat.chatName}
          </div>

          <p className="text-[13px] text-gray-400">
            {!truncateStr(chat.laestMessage, 25) && 'No messages yet.'}
          </p>
        </div>
        {/* <div className="font-medium text-sm text-gray-dark">
          {!dateToTime(lastDate) && ''}
        </div> */}
      </div>
    </Link>
  );
};

export default ContactItem;
