import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

const ProtectedPage = (): JSX.Element => {
  const location = useLocation();
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  if (!user && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedPage;
