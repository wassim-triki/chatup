import { useEffect, useState } from 'react';
import useChat from '../context/ChatContext/ChatState';
import useAuth from '../context/UserContext/UserState';
import MessagesForm from './MessagesForm';

const Chat = () => {
  const { chats } = useChat();
  const [chat, setChat] = useState(chats?.activeChat);
  useEffect(() => {
    setChat(chats?.activeChat);
  }, [chats]);
  return (
    <div className="box p-0 font-fira items-stretch">
      {chat ? (
        <>
          <div className=" p-2 border-b-2 border-b-gray-100">
            <div className="flex items-center h-full gap-2">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  className="h-12 w-12 object-cover object-center"
                  src={chat?.picture}
                  alt=""
                />
              </div>
              <div>
                <p>
                  {chat?.firstName} {chat?.lastName}
                </p>
                <p className="text-gray-default text-sm">last seen</p>
              </div>
            </div>
          </div>
          <div className="p-4 mt-auto items-stretch ">
            <MessagesForm />
          </div>
        </>
      ) : (
        'no active chat'
      )}
    </div>
  );
};

export default Chat;
