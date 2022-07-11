import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  BsPlus,
  BsPlusCircle,
  BsPlusCircleDotted,
  BsPlusLg,
} from 'react-icons/bs';
import Chat from '../components/Chat';
import Contacts from '../components/Contacts';
import SearchInput from '../components/SearchInput';

export const Main = () => {
  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-7 items-center">
        <div className="w-[300px]">
          <SearchInput />
        </div>
        <div className="flex-1 flex gap-4 justify-end">
          <button className="bg-white btn-rounded whitespace-nowrap flex items-center gap-2 hover:shadow-sm hover:bg-gray-100 transition-all duration-200">
            <BsPlusCircle className="text-xl" /> <p>GOURP CHAT</p>
          </button>
        </div>
      </div>
      <div className="flex gap-7 mb-7 h-[calc(100vh-220px)]">
        <div className="w-[300px]">
          <Contacts />
        </div>
        <div className="flex-1">
          <Chat />
        </div>
      </div>

      {/* <div className="col  bg-green-300 col-span-2 h-[100px]">users</div>
      <div className="col  bg-blue-300 col-span-4 h-[100px]">chat</div> */}
    </main>
  );
};
