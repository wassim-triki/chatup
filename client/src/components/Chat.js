import axios from '../api/axiosConfig';
import { useEffect, useState } from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import getChatUser from '../helpers/getChatUser';
import MessagesForm from './MessagesForm';
import dateToTime from '../helpers/dateToTime';
import useSocket from '../context/SocketContext/SocketState';
import { useRef } from 'react';
import Message from './Message';
import useDarkMode from '../context/DarkModeContext/DarkModeState';
import { BiArrowBack } from 'react-icons/bi';

const Chat = () => {
  const { auth } = useAuth();
  const { openChat, setOpenChat, messages, setMessages } = useChat();
  const [chatUser, setChatUser] = useState(null);
  const { receiveMessage, socket } = useSocket();
  const { isDark } = useDarkMode();

  useEffect(() => {
    receiveMessage((msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, [socket]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    console.log('OPEN CHAT:', openChat);
  }, [openChat]);
  useEffect(() => {
    !openChat?.chat.isGroupChat &&
      setChatUser(getChatUser(auth.user, openChat?.chat.users));
  }, [openChat]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (openChat) {
          const resp = await axios.get(`/chat/${openChat.chat._id}/messages`);
          setMessages(resp.data);
        } else return;
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [openChat]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div
      className={`box ${
        isDark && 'bg-dark-90 text-white'
      } p-0 font-poppins items-stretch`}
    >
      {openChat ? (
        <>
          <div
            className={`p-2 border-b-[1px] ${
              isDark ? 'border-b-dark-80' : 'border-b-gray-200'
            } `}
          >
            <div className="flex items-center h-full gap-0">
              <button
                onClick={() => setOpenChat(null)}
                className=" h-full w-12 flex justify-center items-center"
              >
                <BiArrowBack className="text-xl text-dark-70" />
              </button>
              <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden mr-2">
                <img
                  className="h-10 w-10 lg:h-12 lg:w-12 object-cover object-center"
                  src={!openChat.isGroupChat && chatUser?.picture}
                  alt=""
                />
              </div>
              <div className="text-sm">
                <p>
                  {openChat.isGroupChat
                    ? openChat.chatName
                    : `${chatUser?.firstName} ${chatUser?.lastName}`}
                </p>
                <p className="text-gray-default text-xs">last seen</p>
              </div>
              {/* <BiArrowBack className="mx-5 ml-auto  text-xl text-gray-dark" /> */}
            </div>
          </div>
          <div className="h-full p-2 no-scrollbar  lg:p-4 flex  overflow-y-scroll overflow-x-hidden lg:scrollbar relative">
            {messages.length ? (
              <div className="flex w-full flex-col ">
                <div className="flex flex-col gap-2 w-full h-full ">
                  {messages.map((message, idx) => {
                    return (
                      <div key={message._id}>
                        <Message {...message} idx={idx} />
                        <div
                          className="w-full bg-black z-50"
                          ref={messagesEndRef}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 w-full flex items-center justify-center">
                No messages yet...
              </p>
            )}
          </div>
          <div className="p-2 sm:p-4 mt-auto items-stretch w-full ">
            <MessagesForm />
          </div>
        </>
      ) : (
        <div className="h-full w-full  flex gap-2 flex-col justify-center items-center ">
          <img
            src={require(`../assets/images/logo192-outline${
              isDark ? '-light' : ''
            }.png`)}
            className="h-24"
            alt=""
          />
          <p className="text-xl font-extralight font-poppins">Your Messages</p>
          <p
            className={`text-sm font-light  ${
              isDark ? 'text-dark-70' : 'text-gray-400'
            } font-poppins text-center`}
          >
            Select a chat to begin private messaging
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
