import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { UserDetail } from './model/userDetail';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _url: string = 'http://localhost:3000/api/users/login';
  _urlNew: string = 'http://localhost:3000/api/user';
  _token: string = 'Token ';
  constructor(private _http: HttpClient) {}
  login(user: User) {
    return this._http.post<UserDetail>(this._url, { user: user });
  }

  getCurrentUser(token: string) {
    let autherizationHeader = this._token + token;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<any>(this._urlNew, httpOptions);
  }
}
