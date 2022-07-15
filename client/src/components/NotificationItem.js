import axios from '../api/axiosConfig';
import React from 'react';
import { toast } from 'react-toastify';
import useAuth from '../context/UserContext/UserState';
import useChat from '../context/ChatContext/ChatState';
import useSocket from '../context/SocketContext/SocketState';
const NotificationItem = ({ _id, picture, firstName, lastName }) => {
  const { auth, acceptRequest } = useAuth();
  const { setChats } = useChat();
  const { socket } = useSocket();
  const handleAccept = async (e) => {
    try {
      const resp = await axios.post('/chat/acceptRequest', { id: _id });
      toast(resp.data.message, { type: 'success' });
      const chat = resp.data.chat;
      setChats((c) => [chat, ...c]);
      acceptRequest(_id);
      socket.emit('accept_request', { senderId: _id, chat });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={_id}
      className="w-[300px] flex flex-col gap-2  font-fira hover:bg-gray-100 rounded-xl p-2"
    >
      <div className="flex items-start gap-2">
        <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden ">
          <img className="object-cover object-center" src={picture} alt="" />
        </div>
        <div className="flex flex-col gap-1">
          <div>
            <p className="font-medium inline">
              {firstName + ' ' + lastName + ' '}
            </p>
            <p className="inline text-sm text-gray-default">
              sent you a friend request.
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-1 justify-end items-center">
        <button className="btn-notif bg-green-dark" onClick={handleAccept}>
          Accept
        </button>
        <button className="btn-notif bg-gray-400">Decline</button>
      </div>
    </div>
  );
};

export default NotificationItem;
