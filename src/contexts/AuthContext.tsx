import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
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
  handleSignOut: () => void;
  isCheckingToken: boolean;
  setIsCheckingToken: React.Dispatch<React.SetStateAction<boolean>>;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<IAuthContextState | null>(null);

export const AuthProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [userData, setUserData] = useState<IEmployee>({} as IEmployee);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  const history = useHistory();

  const userAuth = new auth();

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
        })
        .finally(() => {
          setIsCheckingToken(false);
          console.log(isCheckingToken);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  const handleSignIn = (email: string, password: string) => {
    setIsCheckingToken(true);
    userAuth
      .login(email, password)
      .then((res: any) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          setUserData(res.user);
          history.push('/');
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setIsCheckingToken(false);
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
        handleSignOut,
        isCheckingToken,
        setIsCheckingToken,
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
