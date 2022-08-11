import axios from '../api/axiosConfig';
import React, { useState } from 'react';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import useChat from '../context/ChatContext/ChatState';
import useModal from '../context/ModalContext/ModalState';
import { toast } from 'react-toastify';

const DeleteChatModalContent = ({ pic, firstName, lastName }) => {
  const { closeModal } = useModal();
  const { setChats, chats, setOpenChat, openChat } = useChat();
  const [isHovered, setIsHovered] = useState(false);
  const toggleHover = () => setIsHovered(!isHovered);
  const handleDelete = async (e) => {
    try {
      const resp = await axios.post('/chat/deleteChat', {
        chatId: openChat.chat._id,
      });
      setChats(chats.filter((chat) => chat._id !== openChat.chat._id));
      setOpenChat(null);
      closeModal();
      toast(resp.data.message, { type: 'success' });
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  };
  return (
    <div className="flex flex-col items-center gap-3 font-poppins">
      <div className="flex flex-col items-center gap-1">
        <img
          className="h-12 w-12 rounded-full object-cover object-center"
          src={pic}
          alt=""
        />
        <div className="font-semibold text-xl text-center ">
          {firstName} {lastName}
        </div>
      </div>

      <div className="flex">Will Be Deleted From Your Chats</div>
      <div className="flex items-center  self-stretch justify-evenly">
        <button
          onClick={handleDelete}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          className={`group flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 text-2xl`}
        >
          {isHovered ? <AiFillDelete /> : <AiOutlineDelete />}
        </button>
        <button
          onClick={closeModal}
          className="justify-self-end text-right  underline underline-offset-2"
        >
          Keep
        </button>
      </div>
    </div>
  );
};

export default DeleteChatModalContent;
