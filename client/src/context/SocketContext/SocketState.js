import { useContext, useEffect, useState } from 'react';
import SocketContext from './SocketContext';
import { io } from 'socket.io-client';
import useAuth from '../UserContext/UserState';
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(
    io('https://app-chatup.herokuapp.com', 'http://localhost:8080', {
      withCredentials: true,
    })
  );
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket');
    });
    return () => {
      socket.off('connect');
    };
  }, [socket]);

  const connectUser = (id) => {
    socket.emit('user_connected', id);
  };
  const disconnectUser = () => {
    socket.emit('user_disconnected', socket.id);
  };
  const sendNotification = (senderId, receiverId) => {
    socket.emit('send_notification', {
      senderId,
      receiverId,
    });
  };
  const receiveNotification = (callback) => {
    socket.on('receive_notification', callback);
  };
  const receiveAcceptedChat = (callback) => {
    socket.on('accepted_request', callback);
  };
  const sendMessage = (data) => {
    socket.emit('send_message', data);
  };
  const receiveMessage = (callback) => {
    socket.on('receive_message', callback);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectUser,
        disconnectUser,
        sendNotification,
        receiveNotification,
        receiveAcceptedChat,
        sendMessage,
        receiveMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export default useSocket;
