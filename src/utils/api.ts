import { IReportBody } from '../model/ReportData';
import { ITaskBody } from '../model/TaskData';

export class Api {
  BASE_URL: string;

  constructor() {
    this.BASE_URL = 'http://localhost:3000';
    // this.BASE_URL = 'https://api.reportr.solomonbarayev.dev';
  }

  private _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  }

  public getAllEmployees = () => {
    return fetch(`${this.BASE_URL}/employees`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(this._checkResponse);
  };

  //get single employee by request params id (employeeID)
  public getEmployee = (token: string | null, employeeID: string) => {
    return fetch(`${this.BASE_URL}/employees/${employeeID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public getCurrentUserTasks = (token: string | null) => {
    return fetch(`${this.BASE_URL}/tasks/mytasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  public getCurrentUserReports = (token: string | null) => {
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
  public createReport = (
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
  public assignTask = (
    token: string | null,
    task: ITaskBody,
    employeeId: string
  ) => {
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

  //delete report
  public deleteReport = (token: string | null, reportId: string) => {
    return fetch(`${this.BASE_URL}/reports/${reportId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //delete all reports for user
  public deleteAllReportsForUser = (token: string | null) => {
    return fetch(`${this.BASE_URL}/reports`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  //complete task
  public completeTask = (token: string | null, taskId: string) => {
    return fetch(`${this.BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
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
