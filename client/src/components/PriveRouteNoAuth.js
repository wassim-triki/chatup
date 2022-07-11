import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../context/UserContext/UserState';

const PriveRouteNoAuth = () => {
  const { auth } = useAuth();

  return !auth.isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PriveRouteNoAuth;
