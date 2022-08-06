import { useContext, useEffect, useState } from 'react';
import useAuth from '../UserContext/UserState';
import ChatContext from './ChatContext';

export const ChatProvider = ({ children }) => {
  const [initialChats, setInitialChats] = useState([]);
  const [updatedChats, setUpdatedChats] = useState(initialChats);
  const [openChat, setOpenChat] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        initialChats,
        updatedChats,
        setInitialChats,
        setUpdatedChats,
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
