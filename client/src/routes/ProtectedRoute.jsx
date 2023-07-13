import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();

  return isAuth ? children : <Navigate to="/" replace></Navigate>;
};

export default ProtectedRoute;
