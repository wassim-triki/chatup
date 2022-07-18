import axios from '../api/axiosConfig';
import { useEffect, useState } from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import getChatUser from '../helpers/getChatUser';
import MessagesForm from './MessagesForm';
import dateToTime from '../helpers/dateToTime';
import useSocket from '../context/SocketContext/SocketState';
import { useRef } from 'react';

const Chat = () => {
  const { auth } = useAuth();
  const { openChat, messages, setMessages } = useChat();
  const [chatUser, setChatUser] = useState(null);
  const { receiveMessage, socket } = useSocket();

  useEffect(() => {
    receiveMessage((msg) => {
      console.log(msg);
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
        const resp = await axios.get(`/chat/${openChat.chat._id}/messages`);
        setMessages(resp.data);
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
                  {messages.map((m, idx) => {
                    return (
                      <div
                        key={m._id}
                        className={`w-full   h-fit font-poppins flex ${
                          m.sender === auth.user._id
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        <div
                          className={` max-w-[80%] min-h-[70px] h-full flex min-w-[70px] gap-4 ${
                            m.sender === auth.user._id && 'flex-row-reverse'
                          }`}
                        >
                          <div
                            className={`${
                              m.sender === auth.user._id ? 'hidden' : 'w-10'
                            } h-full flex flex-col items-center gap-1 `}
                          >
                            {m?.sender != auth.user._id && (
                              <>
                                <div className="h-10 w-10 ">
                                  {!(
                                    messages[idx - 1]?.sender === m.sender
                                  ) && (
                                    <div className="h-full rounded-full overflow-hidden">
                                      <img
                                        className="h-full w-full object-cover object-center"
                                        src={
                                          openChat.chat.users[0]._id ===
                                          m.sender
                                            ? openChat.chat.users[0].picture
                                            : openChat.chat.users[1].picture
                                        }
                                        alt=""
                                      />
                                    </div>
                                  )}
                                </div>
                                {!(messages[idx - 1]?.sender === m.sender) && (
                                  <span className="text-xs font-medium  text-gray-dark text-center">
                                    {dateToTime(m.createdAt)}
                                  </span>
                                )}
                              </>
                            )}
                          </div>

                          <div
                            className={`flex flex-1 items-center justify-center max-w-full min-w-[70px]   p-4 rounded-xl bg-gray-light break-all  font-light text-gray-dark ${
                              m.sender === auth.user._id
                                ? 'rounded-tr-none bg-indigo-default text-white'
                                : 'rounded-tl-none '
                            }`}
                          >
                            {m.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div ref={messagesEndRef}></div>
              </div>
            ) : (
              <p className="text-gray-400">No messages yet...</p>
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
