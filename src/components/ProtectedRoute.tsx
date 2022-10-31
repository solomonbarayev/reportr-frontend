import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute = ({ children, ...props }: Props) => {
  const authContext = useAuth();
  return authContext!.isLoggedIn ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
