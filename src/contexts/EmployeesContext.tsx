import { createContext, useContext, useState, useEffect } from 'react';
import { IEmployee } from '../model/EmployeeData';
import api from '../utils/api';

interface IContextState {
  employees: IEmployee[];
  setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>;
}

const EmployeesContext = createContext({} as IContextState);

const token = localStorage.getItem('jwt');

export const EmployeesProvider = ({ children }: any) => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    api.getAllEmployees(token).then((res) => {
      setEmployees(res);
    });
  }, []);

  return (
    <EmployeesContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeesContext.Provider>
  );
};

export default EmployeesProvider;

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  return context;
};
