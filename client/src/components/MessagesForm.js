import axios from '../api/axiosConfig';
import React, { useEffect, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { RiSendPlaneFill } from 'react-icons/ri';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import useSocket from '../context/SocketContext/SocketState';
const MessagesForm = () => {
  const [msg, setMsg] = useState('');
  const { auth } = useAuth();
  const { sendMessage, receiveMessage } = useSocket();
  const { openChat, setMessages, messages } = useChat();

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
      // receiveMessage((msg) => {
      //   alert('received msg');
      //   setMessages(messages=>[...messages, msg]);
      // });
      setMsg('');
      setMessages((messages) => [...messages, sentMsg]);
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="flex items-center gap-4 " onSubmit={handleSubmit}>
      <div className="flex-1 bg-gray-light rounded-full flex items-stretch h-12 ">
        <div className="message-form-icons">
          <BsEmojiSmile />
        </div>
        <input
          className="bg-transparent flex-1 outline-none "
          placeholder="Say something"
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />

        <label htmlFor="file" className=" message-form-icons">
          <input type="file" className="hidden" id="file" />
          <ImAttachment />
        </label>
      </div>
      <button
        type="submit"
        className="bg-green-dark h-12 w-12 flex items-center justify-center text-white rounded-full text-2xl"
      >
        <RiSendPlaneFill className="mr-1 mt-1" />
      </button>
    </form>
  );
};

export default MessagesForm;
