import React, { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import PATHS from '../constants/paths'
import * as cookies from '../utils/cookies'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = cookies.hasValue("token")

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} />
  }

  return children
};

export default PrivateRoute
