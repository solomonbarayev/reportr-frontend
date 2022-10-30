import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeSinglePage from './components/EmployeeSinglePage';
import Header from './components/Header';
import TasksPage from './components/TasksPage';

import auth, { IRegisterData } from '../src/utils/auth';

import api from '../src/utils/api';
import { IAuth } from '../src/utils/auth';
// import { useAuth } from './contexts/AuthContext';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { IEmployee } from './model/EmployeeData';
import { useEmployees } from './contexts/EmployeesContext';
import ReportPage from './components/ReportPage';

import TaskPopup from './components/TaskPopup';
import ReportPopup from './components/ReportPopup';
import { IReport } from './model/ReportData';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userData, setUserData] = useState<IEmployee>({} as IEmployee);

  const [reportingToManager, setReportingToManager] = useState<string | null>(
    ''
  );

  const [assigningTaskToEmployee, setAssigningTaskToEmployee] = useState<
    string | null
  >('');

  //popup states
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

  const { setEmployees, setLoggedIn } = useEmployees();

  const history = useHistory();

  const userAuth: IAuth = new auth();

  useEffect(() => {
    if (token) {
      userAuth
        .checkToken(token)
        .then((res: IEmployee) => {
          if (res) {
            setIsLoggedIn(true);
            setLoggedIn(true); // temporary solution until you figure out Auth context!!!!!
            setUserData(res);
            history.push('/');
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
        .getAllEmployees()
        .then((res: IEmployee[]) => {
          setEmployees(res);
        })
        .catch((err: any) => {
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
          setUserData(res.user);
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
    setUserData({} as IEmployee);
    setToken('');
    setIsLoggedIn(false);
    history.push('/signin');
  };

  const handleTaskPopupOpen = () => {
    setIsTaskPopupOpen(true);
  };

  const handleReportPopupOpen = () => {
    setIsReportPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsTaskPopupOpen(false);
    setIsReportPopupOpen(false);
  };

  const handleTaskFormSubmit = (taskName: string, dueDate: string) => {
    assigningTaskToEmployee &&
      api
        .assignTask(
          token,
          {
            title: taskName,
            dueDate,
          },
          assigningTaskToEmployee
        )
        .then((res: { token: string; user: IEmployee }) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          closeAllPopups();
        });
  };

  const handleReportFormSubmit = (reportName: string, dueDate: string) => {
    console.log(reportName, dueDate, reportingToManager);
    api
      .createReport(
        token,
        {
          text: reportName,
          date: dueDate,
        },
        reportingToManager
      )
      .then((res: { message: string; report: IReport }) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  };

  return (
    <div className="App">
      <Header
        handleSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        isManager={userData.isManager}
        email={userData.email}
      />

      <Switch>
        <ProtectedRoute isLoggedIn={isLoggedIn} path="/" exact>
          <EmployeeList />
        </ProtectedRoute>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/employee/:id">
          <EmployeeSinglePage
            handleTaskPopupOpen={handleTaskPopupOpen}
            handleReportPopupOpen={handleReportPopupOpen}
            setReportingToManager={setReportingToManager}
            setAssigningTaskToEmployee={setAssigningTaskToEmployee}
          />
        </ProtectedRoute>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/mytasks">
          <TasksPage />
        </ProtectedRoute>

        <ProtectedRoute isLoggedIn={isLoggedIn} path="/myreports">
          <ReportPage />
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

      <TaskPopup
        isOpen={isTaskPopupOpen}
        onClose={closeAllPopups}
        name="task-popup"
        onSubmit={handleTaskFormSubmit}
      />
      <ReportPopup
        isOpen={isReportPopupOpen}
        onClose={closeAllPopups}
        name="report-popup"
        onSubmit={handleReportFormSubmit}
      />
    </div>
  );
};

export default App;
