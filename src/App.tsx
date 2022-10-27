import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeSinglePage from './components/EmployeeSinglePage/EmployeeSinglePage';
import Nav from './components/Nav/Nav';

import auth, { IRegisterData } from './utils/auth';
import api from './utils/api';
import { IAuth } from './utils/auth';
import { useAuth } from './contexts/AuthContext';

import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { IEmployee } from './model/EmployeeData';
import { useEmployees } from './contexts/EmployeesContext';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userData, setUserData] = useState({
    email: '',
  });
  // const [employees, setEmployees] = useState<IEmployee[]>([]);

  const { setEmployees } = useEmployees();

  const history = useHistory();

  const userAuth: IAuth = new auth();

  useEffect(() => {
    if (token) {
      userAuth
        .checkToken(token)
        .then((res: IEmployee) => {
          if (res) {
            setIsLoggedIn(true);
            setUserData(res);
            history.push('/');
            console.log(userData);
          }
        })
        .catch((err: any) => {
          console.log(err);
          history.push('/signin');
        });
    }
  }, []);

  //fetch employees from api when logged in
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getAllEmployees(token)
        .then((res: IEmployee[]) => {
          setEmployees(res);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, token]);

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
          history.push('/signin');
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setToken('');
    setIsLoggedIn(false);
    history.push('/signin');
  };

  return (
    <div className="App">
      <h1>Reportr</h1>
      <Nav handleSignOut={handleSignOut} isLoggedIn={isLoggedIn} />
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
