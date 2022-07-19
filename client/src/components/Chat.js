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

const Chat = () => {
  const { auth } = useAuth();
  const { openChat, messages, setMessages } = useChat();
  const [chatUser, setChatUser] = useState(null);
  const { receiveMessage, socket } = useSocket();

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
    <div className="box p-0 font-fira items-stretch">
      {openChat ? (
        <>
          <div className=" p-2 border-b-2 border-b-gray-100">
            <div className="flex items-center h-full gap-2">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  className="h-12 w-12 object-cover object-center"
                  src={!openChat.isGroupChat && chatUser?.picture}
                  alt=""
                />
              </div>
              <div>
                <p>
                  {openChat.isGroupChat
                    ? openChat.chatName
                    : `${chatUser?.firstName} ${chatUser?.lastName}`}
                </p>
                <p className="text-gray-default text-sm">last seen</p>
              </div>
            </div>
          </div>
          <div className="h-full p-4 flex  overflow-y-scroll overflow-x-hidden scrollbar relative">
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
          <div className="p-4 mt-auto items-stretch ">
            <MessagesForm />
          </div>
        </>
      ) : (
        <div className="h-full w-full bg-gray-light flex justify-center items-center text-gray-400">
          No Active Chat.
        </div>
      )}
    </div>
  );
};

export default Chat;
