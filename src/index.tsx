import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import EmployeesProvider from './contexts/EmployeesContext';
import AuthProvider from './contexts/AuthContext';
import PopupsProvider from './contexts/PopupsContext';
import FormValidityProvider from './contexts/FormVallidityContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PopupsProvider>
        <AuthProvider>
          <EmployeesProvider>
            <FormValidityProvider>
              <App />
            </FormValidityProvider>
          </EmployeesProvider>
        </AuthProvider>
      </PopupsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
