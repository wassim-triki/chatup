import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { RiSendPlaneFill } from 'react-icons/ri';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import useSocket from '../context/SocketContext/SocketState';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
const MessagesForm = () => {
  const [msg, setMsg] = useState('');
  const { auth } = useAuth();
  const { sendMessage, receiveMessage } = useSocket();
  const { openChat, setMessages, messages } = useChat();
  const { isDark } = useDarkMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!msg.trim().length) return;
      const message = {
        sender: auth.user._id,
        content: msg.trim(),
        chat: openChat.chat._id,
      };
      const resp = await axios.post('/chat/sendMessage', message);
      const sentMsg = resp.data;
      sendMessage({
        receiver:
          openChat.chat.users[0]._id === auth.user._id
            ? openChat.chat.users[1]._id
            : openChat.chat.users[0]._id,
        message: sentMsg,
      });

      setMsg('');
      setMessages((messages) => [...messages, sentMsg]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex items-center gap-2 sm:gap-4 w-full"
      onSubmit={handleSubmit}
    >
      <div
        className={`flex-1 ${
          isDark ? 'bg-dark-80' : 'bg-gray-light'
        } rounded-full flex items-stretch h-12 w-full`}
      >
        <div className={`message-form-icons ${isDark && 'text-white'}`}>
          <BsEmojiSmile />
        </div>
        <input
          className="text-sm sm:text-base bg-transparent flex-1  outline-none placeholder:text-dark-70"
          placeholder="Say something"
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />

        <label
          htmlFor="file"
          className={`message-form-icons ${isDark && 'text-white'}`}
        >
          <input type="file" className="hidden" id="file" />
          <ImAttachment />
        </label>
      </div>
      <button
        type="submit"
        className="bg-green-dark h-12 w-12 shrink-0 grow-0 flex items-center justify-center text-white rounded-full text-2xl "
      >
        <RiSendPlaneFill className="mr-1 mt-1" />
      </button>
    </form>
  );
};

export default MessagesForm;
