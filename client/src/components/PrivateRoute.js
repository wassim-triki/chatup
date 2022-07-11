import React, { useEffect } from 'react';
import useAuth from '../context/UserContext/UserState';
import { Navigate, Outlet, Route } from 'react-router-dom';
const PrivateRoute = () => {
  const { auth } = useAuth();

  return auth.isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
