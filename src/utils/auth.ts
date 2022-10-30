export interface IRegisterData {
  email: string;
  password: string;
  picture: string;
  firstName: string;
  lastName: string;
  position: string;
  isManager: boolean;
  mySubordinates: string[];
}

export interface IAuth {
  BASE_URL: string;
  _customFetch(url: string, headers: RequestInit): Promise<any>;
  login(email: string, password: string): Promise<any>;
  register(data: IRegisterData): Promise<any>;
  checkToken(token: string): Promise<any>;
}

export default class Auth implements IAuth {
  BASE_URL: string;

  constructor() {
    // this.BASE_URL = 'http://localhost:3000';
    this.BASE_URL = 'https://api.reportr.solomonbarayev.dev';
  }

  _customFetch(url: string, headers: Object) {
    return fetch(url, headers).then((res) =>
      res.ok ? res.json() : Promise.reject(res.statusText)
    );
  }

  register(data: IRegisterData) {
    console.log(data);
    return this._customFetch(`${this.BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  login(email: string, password: string) {
    return this._customFetch(`${this.BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken = (token: string) => {
    return this._customFetch(`${this.BASE_URL}/employees/myprofile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };
}
