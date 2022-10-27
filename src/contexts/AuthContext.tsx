import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { IAuth } from '../utils/auth';
import { IEmployee } from '../model/EmployeeData';
import { IRegisterData } from '../utils/auth';
import auth from '../utils/auth';

interface IAuthContextState {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  userData: IEmployee;
  setUserData: React.Dispatch<React.SetStateAction<IEmployee>>;
  handleSignIn: (email: string, password: string) => void;
  handleSignUp: (data: IRegisterData) => void;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<IAuthContextState | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userData, setUserData] = useState<IEmployee>({} as IEmployee);

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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        userData,
        setUserData,
        handleSignIn,
        handleSignUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log(context);
  return context;
};
