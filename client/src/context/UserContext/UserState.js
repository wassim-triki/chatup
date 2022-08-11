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
  DECLINE_REQUEST,
  ACCEPTED_REQUEST,
} from './UserActions';
import UserContext from './UserContext';
import userReducer from './UserReducer';
import { Navigate, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useSocket from '../SocketContext/SocketState';

export const initialState = {
  user: null,
  isAuth: false,
};

export const UserProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(userReducer, initialState);
  const { data, error, loading } = useFetch('/auth/me');
  const navigate = useNavigate();

  useEffect(() => {
    loginUser(data);
  }, [data]);
  useEffect(() => {
    // console.log(error);
  }, [error]);
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  const loginUser = (user) => {
    // user?._id && connectUser(user._id);
    const payload = { user, isAuth: user != null };
    dispatch({ type: LOGIN_USER, payload });
  };
  const logoutUser = () => {
    // disconnectUser();
    dispatch({ type: LOGOUT_USER });
  };
  const sendRequest = (receiverId) => {
    dispatch({ type: SEND_REQUEST, payload: receiverId });
  };
  const receiveRequest = (sender) => {
    dispatch({ type: RECEIVE_REQUEST, payload: sender });
  };
  const acceptRequest = (senderId) => {
    dispatch({ type: ACCEPT_REQUEST, payload: senderId });
  };
  const declineRequest = (senderId) => {
    dispatch({ type: DECLINE_REQUEST, payload: senderId });
  };

  return (
    <UserContext.Provider
      value={{
        auth,
        loginUser,
        logoutUser,
        loading,
        acceptRequest,
        receiveRequest,
        declineRequest,
        sendRequest,
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
