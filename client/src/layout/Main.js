import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  BsPlus,
  BsPlusCircle,
  BsPlusCircleDotted,
  BsPlusLg,
} from 'react-icons/bs';
import Chat from '../components/Chat';
import Contacts from '../components/Chats';
import SearchInput from '../components/SearchInput';
import useChat from '../context/ChatContext/ChatState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';

export const Main = () => {
  const { isDark } = useDarkMode();
  const { openChat } = useChat();
  return (
    <main className="flex flex-col gap-2 lg:gap-4 overflow-x-hidden">
      <div className="flex gap-7 items-center ">
        <div className="w-full lg:w-[300px]">
          <SearchInput />
        </div>
        <div className="hidden flex-1 lg:flex gap-4 justify-end">
          <button
            className={`${
              isDark
                ? 'text-white bg-dark-90 hover:bg-dark-80'
                : 'bg-white hover:bg-gray-100'
            } btn-rounded whitespace-nowrap flex items-center gap-2 hover:shadow-sm  transition-all duration-200`}
          >
            <BsPlusCircle className="text-xl" /> <p>GOURP CHAT</p>
          </button>
        </div>
      </div>
      <div className="flex gap-7 lg:mb-7 h-[calc(100vh-138px)] lg:h-[calc(100vh-220px)]">
        <div className={`${openChat && 'hidden'} w-full lg:w-[300px]`}>
          <Contacts />
        </div>
        <div className={`${!openChat && 'hidden'} lg:flex-1 w-full`}>
          <Chat />
        </div>
      </div>
    </main>
  );
};
