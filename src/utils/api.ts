import { IEmployee } from '../model/EmployeeData';
import { ITask } from '../model/TaskData';
export interface IApi {
  BASE_URL: string;
  _customFetch(url: string, headers: RequestInit): Promise<any>;
  getAllEmployees(token: string): Promise<IEmployee[]>;
  getEmployee(token: string, employeeID: string): Promise<IEmployee>;
  getEmployeeTasks(token: string, employeeID: string): Promise<ITask>;
}

export class Api {
  BASE_URL: string;

  constructor() {
    this.BASE_URL = 'http://localhost:3000';
  }

  _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }

  getAllEmployees = (token: string | null) => {
    return fetch(`${this.BASE_URL}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //get single employee by request params id (employeeID)
  getEmployee = (token: string | null, employeeID: string) => {
    return fetch(`${this.BASE_URL}/employees/${employeeID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //get tasks for a single employee by request params id (employeeID)
  getEmployeeTasks = (token: string | null, employeeID: string) => {
    return fetch(`${this.BASE_URL}/tasks/${employeeID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };
}

const api = new Api();

export default api;
