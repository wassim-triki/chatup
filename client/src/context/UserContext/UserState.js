import axios from '../../api/axiosConfig';
import { useContext, useEffect, useMemo, useReducer } from 'react';
import fetchData from '../../helpers/fetchData';
import parseJWT from '../../helpers/parseJWT';
import {
  ACCEPT_REQUEST,
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_REQUEST,
  SEND_REQUEST,
  ACCEPTED_REQUEST,
  BEGIN_CHAT,
  END_CHAT,
  SEND_MESSAGE,
} from './UserActions';
import UserContext from './UserContext';
import userReducer from './UserReducer';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useSocket from '../SocketContext/SocketState';

export const initialState = {
  user: null,
  chat: null,
  isAuth: false,
};

export const UserProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(userReducer, initialState);
  const {
    socket,
    connectUser,
    disconnectUser,
    sendNotification,
    receiveNotification,
    acceptRequestNotification,
    acceptedRequestNotification,
  } = useSocket();
  const { data, error, loading } = useFetch('/auth/me');
  const navigate = useNavigate();

  useEffect(() => {
    loginUser(data);
  }, [data]);
  useEffect(() => {
    console.log(error);
  }, [error]);
  const loginUser = (user) => {
    user?._id && connectUser(user._id);
    const payload = { user, isAuth: user != null };
    dispatch({ type: LOGIN_USER, payload });
  };
  const logoutUser = () => {
    disconnectUser();
    auth.chat && endChat();

    dispatch({ type: LOGOUT_USER });
  };
  const sendRequest = (receiverId) => {
    sendNotification(auth.user._id, receiverId);
    dispatch({ type: SEND_REQUEST, payload: receiverId });
  };
  const receiveRequest = () => {
    receiveNotification((senderId) => {
      dispatch({ type: RECEIVE_REQUEST, payload: senderId });
    });
  };
  const acceptRequest = (senderId) => {
    acceptRequestNotification(senderId, auth.user._id);
    dispatch({ type: ACCEPT_REQUEST, payload: senderId });
  };
  const acceptedRequest = () => {
    acceptedRequestNotification((receiverId) => {
      dispatch({ type: ACCEPTED_REQUEST, payload: receiverId });
    });
  };

  const beginChat = (receiver) => {
    const payload = {
      sender: auth.user,
      receiver,
    };
    dispatch({
      type: BEGIN_CHAT,
      payload,
    });
  };
  const sendMessage = (msg) => {
    console.log(msg);
    dispatch({
      type: SEND_MESSAGE,
      payload: msg,
    });
  };
  const endChat = () => {
    dispatch({
      type: END_CHAT,
      payload: null,
    });
  };

  const getRequests = () => auth.user?.receivedRequests;
  return (
    <UserContext.Provider
      value={{
        auth,
        loginUser,
        logoutUser,
        loading,
        acceptRequest,
        receiveRequest,
        acceptedRequest,
        requests: getRequests(),
        sendRequest,
        beginChat,
        endChat,
        sendMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
