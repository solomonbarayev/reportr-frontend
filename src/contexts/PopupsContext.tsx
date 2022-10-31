import { createContext, useContext, useState } from 'react';
import { IEmployee } from '../model/EmployeeData';
import { IReport } from '../model/ReportData';
import { useAuth } from './AuthContext';
import api from '../utils/api';

interface IPopupContextState {
  isReportPopupOpen: boolean;
  setIsReportPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTaskPopupOpen: boolean;
  setIsTaskPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReportPopupOpen: () => void;
  handleTaskPopupOpen: () => void;
  closeAllPopups: () => void;
  handleTaskFormSubmit: (taskName: string, dueDate: string) => void;
  handleReportFormSubmit: (reportName: string, dueDate: string) => void;
  reportingToManager: string | null;
  setReportingToManager: React.Dispatch<React.SetStateAction<string | null>>;
  assigningTaskToEmployee: string | null;
  setAssigningTaskToEmployee: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

type PopupContextProviderProps = {
  children: React.ReactNode;
};

const PopupsContext = createContext<IPopupContextState | null>(null);

export const PopupsProvider = ({ children }: PopupContextProviderProps) => {
  const authContext = useAuth();

  const [reportingToManager, setReportingToManager] = useState<string | null>(
    ''
  );

  const [assigningTaskToEmployee, setAssigningTaskToEmployee] = useState<
    string | null
  >('');
  //popup states
  const [isTaskPopupOpen, setIsTaskPopupOpen] = useState(false);
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

  const handleTaskPopupOpen = () => setIsTaskPopupOpen(true);

  const handleReportPopupOpen = () => setIsReportPopupOpen(true);

  const closeAllPopups = () => {
    setIsTaskPopupOpen(false);
    setIsReportPopupOpen(false);
  };

  const handleTaskFormSubmit = (taskName: string, dueDate: string) => {
    assigningTaskToEmployee &&
      api
        .assignTask(
          authContext!.token,
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
        authContext!.token,
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
    <PopupsContext.Provider
      value={{
        isReportPopupOpen,
        setIsReportPopupOpen,
        isTaskPopupOpen,
        setIsTaskPopupOpen,
        handleReportPopupOpen,
        handleTaskPopupOpen,
        closeAllPopups,
        handleTaskFormSubmit,
        handleReportFormSubmit,
        reportingToManager,
        setReportingToManager,
        assigningTaskToEmployee,
        setAssigningTaskToEmployee,
      }}>
      {children}
    </PopupsContext.Provider>
  );
};

export default PopupsProvider;

export const usePopups = () => {
  const context = useContext(PopupsContext);
  return context;
};
