import { useContext, useEffect, useState } from 'react';
import useSocket from '../SocketContext/SocketState';
import useAuth from '../UserContext/UserState';
import ChatContext from './ChatContext';

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [openChat, setOpenChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const { acceptedRequestNotification } = useSocket();

  useEffect(() => console.log(chats), [chats]);
  const beginChat = (receiver) => {
    const activeChat = chats.chats.find((c) => receiver === c._id);
    setChats({ ...chats, activeChat });
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        beginChat,
        openChat,
        setOpenChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => useContext(ChatContext);

export default useChat;
