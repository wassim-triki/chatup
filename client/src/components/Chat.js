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
import { TbMessages } from 'react-icons/tb';
import UserPicContainer from './UserPicContainer';

const Chat = () => {
  const { auth } = useAuth();
  const { openChat, setOpenChat, messages, setMessages, chats, setChats } =
    useChat();
  const [chatUser, setChatUser] = useState(null);
  const { receiveMessage, socket } = useSocket();
  const { isDark } = useDarkMode();

  useEffect(() => {
    receiveMessage((msg) => {
      console.log(msg);
      if (chats) {
        setChats([
          chats.find((c) => c._id === msg.chat),
          ...chats.filter((c) => c._id !== msg.chat),
        ]);
      }

      setMessages((messages) => [...new Set([...messages, msg])]);
    });

    // receiveMessage(console.log);
  }, [socket, chats]);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    // console.log('OPEN CHAT:', openChat);
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
    console.log(messages);
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
            className={`p-2 flex border-b-[1px] ${
              isDark ? 'border-b-dark-80' : 'border-b-gray-200'
            } `}
          >
            <div className="flex items-center h-full gap-0 overflow-hidden flex-[3]">
              <button
                onClick={() => setOpenChat(null)}
                className=" h-full w-12 flex justify-center items-center"
              >
                <BiArrowBack className="text-xl text-dark-70" />
              </button>

              <UserPicContainer
                pic={!openChat.isGroupChat && chatUser?.picture}
                className="h-10 w-10"
                isOnline={openChat.isOnline}
              />
              <div className="text-sm ml-2 overflow-hidden">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                  {openChat.isGroupChat
                    ? openChat.chatName
                    : `${chatUser?.firstName} ${chatUser?.lastName}`}
                </p>
                <p className="text-gray-default text-xs">
                  {openChat.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex-1 h-full w-full"></div>
          </div>
          <div className="h-full p-2 no-scrollbar  lg:p-4 flex  overflow-y-scroll overflow-x-hidden lg:scrollbar relative">
            {messages.length ? (
              <div className="flex w-full flex-col ">
                <div className="flex flex-col gap-1 w-full h-full ">
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
              <div className="h-full w-full flex flex-col justify-center items-center">
                <TbMessages
                  className={`text-9xl ${
                    isDark ? 'text-dark-80' : 'text-light-80'
                  }`}
                />
                <p
                  className={`${
                    isDark ? 'text-dark-75' : 'text-light-75'
                  }  w-full flex items-center justify-center`}
                >
                  No Messages.
                </p>
              </div>
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
