import { useContext, useEffect, useState } from 'react';
import SocketContext from './SocketContext';
import { io } from 'socket.io-client';
import useAuth from '../UserContext/UserState';
const DEV = 'http://localhost:8080';
export const SocketProvider = ({ children }) => {
  const { auth } = useAuth();
  const [socket, setSocket] = useState(
    io('https://chatup-production.up.railway.app' || DEV, {
      withCredentials: true,
    })
  );

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket');
      connectUserToSocket(auth.user._id);
    });
    return () => {
      socket.off('connect');
      socket.disconnect();
      console.log('disconnect');
    };
  }, [socket]);
  const connectUserToSocket = (id) => {
    socket.emit('user_connected', id);
  };
  const getOnlineUsers = (callback) => {
    socket.on('online_users', callback);
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
        sendNotification,
        receiveNotification,
        receiveAcceptedChat,
        sendMessage,
        receiveMessage,
        getOnlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => useContext(SocketContext);

export default useSocket;
