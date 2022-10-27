import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeSinglePage from './components/EmployeeSinglePage/EmployeeSinglePage';

import auth, { IRegisterData } from './utils/auth';
import { IAuth } from './utils/auth';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userData, setUserData] = useState({});

  const history = useHistory();

  const userAuth: IAuth = new auth();

  useEffect(() => {
    if (token) {
      userAuth
        .checkToken(token)
        .then((res: Object) => {
          if (res) {
            setIsLoggedIn(true);
            setUserData(res);
            history.push('/');
          }
        })
        .catch((err: any) => {
          console.log(err);
          history.push('/signin');
        });
    }
  }, [token, history]);

  const handleSignIn = (email: string, password: string) => {
    userAuth
      .login(email, password)
      .then((res: any) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleSignUp = (data: IRegisterData) => {
    userAuth
      .register(data)
      .then((res: any) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <h1>Reportr</h1>
      <Switch>
        <ProtectedRoute isLoggedIn={isLoggedIn} path="/" exact>
          <EmployeeList />
        </ProtectedRoute>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/employee/:id">
          <EmployeeSinglePage />
        </ProtectedRoute>

        <Route path="/signin">
          <SignIn handleSignIn={handleSignIn} />
        </Route>

        <Route path="/signup">
          <SignUp handleSignUp={handleSignUp} />
        </Route>

        {/* route for non existent to redirect home */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
