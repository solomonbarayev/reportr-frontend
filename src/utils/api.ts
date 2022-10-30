import { IEmployee } from '../model/EmployeeData';
import { IReportBody } from '../model/ReportData';
import { ITask, ITaskBody } from '../model/TaskData';
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

  private _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }

  getAllEmployees = () => {
    return fetch(`${this.BASE_URL}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

  getCurrentUserTasks = (token: string | null) => {
    return fetch(`${this.BASE_URL}/tasks/mytasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  getCurrentUserReports = (token: string | null) => {
    return fetch(`${this.BASE_URL}/reports/myreports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //api call to create report
  createReport = (
    token: string | null,
    report: IReportBody,
    managerId: string | null
  ) => {
    return fetch(`${this.BASE_URL}/reports/${managerId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(report),
    }).then(this._checkResponse);
  };

  //api call to create task
  assignTask = (token: string | null, task: ITaskBody, employeeId: string) => {
    return fetch(`${this.BASE_URL}/tasks/${employeeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    }).then(this._checkResponse);
  };
}

const api = new Api();

export default api;
