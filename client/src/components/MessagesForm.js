import axios from '../api/axiosConfig';
import React, { useEffect, useRef, useState } from 'react';
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { RiSendPlaneFill } from 'react-icons/ri';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import useSocket from '../context/SocketContext/SocketState';
import { useClickAway } from 'react-use';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import uploadImage from '../helpers/uploadImage';
import { ThreeDots } from 'react-loader-spinner';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import Picker from 'emoji-picker-react';
const MessagesForm = () => {
  const [msg, setMsg] = useState('');
  const { auth } = useAuth();
  const { sendMessage, receiveMessage } = useSocket();
  const { openChat, setMessages, messages } = useChat();
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkMode();
  const [files, setFiles] = useState([]);

  const [showEmojis, setShowEmojis] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMsg(msg + emojiObject.emoji);
  };
  const ref = useRef(null);
  useClickAway(ref, () => {
    setShowEmojis(false);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!msg.trim().length && !files.length) return;

      let images = [];
      if (files.length) {
        setLoading(true);
        const urls = await Promise.all(files.map((f) => uploadImage(f)));
        console.log(urls);
        images = urls || [];
      }

      const message = {
        sender: auth.user._id,
        content: msg.trim(),
        images,
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
      setFiles([]);
      setMessages((messages) => [...messages, sentMsg]);
      console.log(sentMsg);
    } catch (error) {
      toast(error.response.data.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleFilesChange = (e) => {
    console.log(e.target.files);
    setFiles([...e.target.files]);
  };
  const handleRemoveFile = (idx) => {
    setFiles(files.filter((file, i) => i !== idx));
  };
  useEffect(() => {
    // console.log(files);
  }, [files]);
  return (
    <form
      className="flex items-center gap-1 sm:gap-4 w-full hx-9 lgx:h-12 relative"
      onSubmit={handleSubmit}
    >
      <div
        className={`flex-1 py-3 ${files.length > 0 && 'pb-2'} ${
          isDark ? 'bg-dark-80' : 'bg-gray-light'
        } rounded-3xl flex items-stretch h-full w-full shrink overflow-hiddsen flex-col gap-2 `}
      >
        <div className=" flex flex-1">
          <div
            onClick={() => setShowEmojis(!showEmojis)}
            className={`message-form-icons ${isDark && 'text-white'}`}
          >
            <BsEmojiSmile />
          </div>
          {showEmojis && (
            <div
              ref={ref}
              className="absolute bottom-[100%] left-0 z-50  w-[100%] sm:w-[300px]"
            >
              <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{
                  width: '100%',
                  boxShadow: 'none',
                }}
              />
            </div>
          )}
          <input
            className="text-xs sm:text-base bg-transparent flex-1  outline-none placeholder:text-dark-70 w-full shrink"
            placeholder="Say something"
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />

          <label
            htmlFor="file"
            className={`message-form-icons ${isDark && 'text-white'}`}
          >
            <input
              type="file"
              className="hidden"
              id="file"
              accept="image/*"
              multiple
              onChange={handleFilesChange}
            />

            <ImAttachment />
          </label>
        </div>

        {files.length > 0 && (
          <div className="flex items-center gap-1  mx-2 flex-wrap">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="px-2 py-1 bg-dark-70 rounded-full self-center text-xs  max-w-[100px]  min-w-[50px] relative"
              >
                <p
                  className={`text-white overflow-hidden whitespace-nowrap text-ellipsis`}
                >
                  {file.name}
                </p>
                <div className="absolute -top-1 -right-1 bg-dark-100 hover:bg-dark-80 cursor-pointer rounded-full">
                  <IoIosClose
                    className=" text-white  text-lg z-50"
                    onClick={() => handleRemoveFile(idx)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-dark h-9 w-9 hover:bg-green-dark/80  lg:w-12 lg:h-12 shrink-0 grow-0 flex items-center justify-center text-white rounded-full text-2xl "
      >
        {loading ? (
          <ThreeDots color="#fff" height={28} width={28} />
        ) : (
          <RiSendPlaneFill className="mr-1 mt-1" />
        )}
      </button>
    </form>
  );
};

export default MessagesForm;
