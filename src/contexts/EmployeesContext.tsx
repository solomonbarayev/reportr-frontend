import React, { createContext, useContext, useState, useEffect } from 'react';
import { IEmployee } from '../model/EmployeeData';
import api from '../utils/api';

interface IContextState {
  employees: IEmployee[];
  setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmployeesContext = createContext({} as IContextState);

const token = localStorage.getItem('jwt');

export const EmployeesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    api.getAllEmployees().then((res) => {
      setEmployees(res);
    });
  }, []);

  return (
    <EmployeesContext.Provider
      value={{ employees, setEmployees, loggedIn, setLoggedIn }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  return context;
};
