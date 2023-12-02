
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { FireAuthContext } from '../context/FireAuth';

const AuthWrap = ({ element }) => {

  const userContext = useContext(FireAuthContext);

  return userContext.user ? (
    element
  ) : (
    <Navigate to="/" replace/>
  );

};

export default AuthWrap;
