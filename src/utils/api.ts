export interface IApi {
  BASE_URL: string;
  _customFetch(url: string, headers: RequestInit): Promise<any>;
  getAllEmployees(): Promise<any>;
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
}

const api = new Api();

export default api;
