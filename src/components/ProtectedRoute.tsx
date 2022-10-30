import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  isLoggedIn: boolean;
  children: React.ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute = ({ isLoggedIn, children, ...props }: Props) => {
  return isLoggedIn ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
