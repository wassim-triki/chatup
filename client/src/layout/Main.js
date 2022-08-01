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
        <div className="w-full lsg:w-[300px]">
          <SearchInput />
        </div>
        {/* <div className="hidden flex-1 lg:flex gap-4 justify-end">
          <button
            className={`${
              isDark
                ? 'text-white bg-dark-90 hover:bg-dark-80'
                : 'bg-white hover:bg-gray-100'
            } btn-rounded whitespace-nowrap flex items-center gap-2 hover:shadow-sm  transition-all duration-200`}
          >
            <BsPlusCircle className="text-xl" /> <p>GOURP CHAT</p>
          </button>
        </div> */}
      </div>
      <div className="flex gap-2 lg:gap-5  lg:mb-7 h-[calc(100vh-120px)] lg:h-[calc(100vh-220px)]">
        <div
          className={`${
            openChat ? 'hidden md:flex' : 'flex'
          } w-full md:min-w-[150px] md:max-w-[300px] shrink-[2]`}
        >
          <Contacts />
        </div>
        <div
          className={`${
            openChat ? 'flex' : 'hidden md:flex'
          } w-full shrink-[1]`}
        >
          <Chat />
        </div>
      </div>
    </main>
  );
};
