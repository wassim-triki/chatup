import React, { useEffect, useState } from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import dateToTime from '../helpers/dateToTime';
import truncateStr from '../helpers/truncateStr';

const ContactItem = ({ lastDate, lastMessage, isOnline, chat }) => {
  const { chats } = useChat();
  const { auth } = useAuth();
  const [chatUser, setChatUser] = useState(null);
  useEffect(() => {
    console.log(chats);
  }, [chats]);

  const handleClick = (e) => {
    // beginChat(data._id);
  };
  return (
    <div
      onClick={handleClick}
      className={`flex gap-3 justify-between cursor-pointer relative hover:bg-gray-100 p-3 mb-2 last-of-type:mb-0 rounded-2xl self-stretch`}
    >
      <div className="relative w-min self-start ">
        <div className="w-12 h-12 rounded-full overflow-hidden ">
          <img
            className="object-cover object-center"
            src={chatUser?.picture}
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
          {chatUser?.firstName + ' ' + chatUser?.lastName}
        </div>

        <p className="text-[14px] text-gray-default">
          {!truncateStr(lastMessage, 25) && ''}
        </p>
      </div>
      <div className="font-medium text-sm text-gray-dark">
        {!dateToTime(lastDate) && ''}
      </div>
    </div>
  );
};

export default ContactItem;
