import React, { useEffect, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAuth from '../context/UserContext/UserState';
const MessagesForm = () => {
  const [msg, setMsg] = useState('');
  const { auth, sendMessage } = useAuth();
  const [chat, setChat] = useState(auth.chat);
  useEffect(() => {
    setChat(auth.chat);
  }, [auth]);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const message = {
        sender: auth.user._id,
        text: msg.trim(),
      };
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
