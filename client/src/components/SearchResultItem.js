import React, { useEffect } from 'react';
import truncateStr from '../helpers/truncateStr';
import fetchData from '../helpers/fetchData';
import useAuth from '../context/UserContext/UserState';
import axios from '../api/axiosConfig';
import { toast } from 'react-toastify';
import useSocket from '../context/SocketContext/SocketState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import { IoPersonAddOutline } from 'react-icons/io5';
const SearchResultItem = ({ _id, picture, firstName, lastName, email }) => {
  const { socket, sendNotification } = useSocket();
  const { auth, sendRequest } = useAuth();
  const { isDark } = useDarkMode();
  const handleClick = async (e) => {
    try {
      const resp = await axios.post('/chat/sendRequest', { id: _id });
      sendRequest(_id);
      sendNotification(auth.user._id, _id);
      toast(resp.data.message, { type: 'success' });
    } catch ({ response }) {
      toast(response.data.message, { type: 'warning' });
    }
  };
  return (
    <div className={`flex p-2 cursor-pointer gap-4 rounded-2xl items-center `}>
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <img className="object-cover w-12 h-12 object-center" src={picture} />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <p
          className={`whitespace-nowrap overflow-hidden text-ellipsis text-lg  font-medium ${
            isDark ? 'text-white' : 'text-gray-dark'
          }`}
        >
          {firstName + ' ' + lastName}
        </p>
        <p className="whitespace-nowrap overflow-hidden text-ellipsis text-gray-default">
          {email}
        </p>
      </div>
      <div
        onClick={handleClick}
        className={` rounded-full shrink-0 w-14 h-14 flex items-center justify-center overflow-hidden text-xl cursor-pointer ${
          isDark
            ? 'text-dark-70 hover:bg-dark-80'
            : 'text-dark-100 hover:bg-gray-light'
        }`}
      >
        <IoPersonAddOutline />
      </div>
    </div>
  );
};

export default SearchResultItem;
