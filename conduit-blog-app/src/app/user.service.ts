import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { UserDetail } from './model/userDetail';
import { NewUser } from './model/newUser';
import { ProfileObj, Profile } from './model/article';
import { UpdatedUser } from './model/updatedUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _url: string = 'http://localhost:3000/api/users/login';
  _urlNew: string = 'http://localhost:3000/api/user';
  _signUpUrl: string = 'http://localhost:3000/api/users';
  _getProfile: string = 'http://localhost:3000/api/profiles/';
  token: string = '';

  constructor(private _http: HttpClient) {}
  login(user: User) {
    return this._http.post<UserDetail>(this._url, { user: user });
  }

  getCurrentUser() {
    let autherizationHeader = this.getAuthHeader();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<UserDetail>(this._urlNew, httpOptions);
  }

  signUp(newUser: NewUser) {
    return this._http.post<UserDetail>(this._signUpUrl, { user: newUser });
  }

  getProfile(profile: string) {
    let autherizationHeader = this.getAuthHeader();
    let url = this._getProfile + profile + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<ProfileObj>(url, httpOptions);
  }

  updateProfile(profile: UpdatedUser) {
    let autherizationHeader = this.getAuthHeader();
    let updatedUserDetail = {
      user: profile,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.put<UpdatedUser>(
      this._urlNew,
      updatedUserDetail,
      httpOptions
    );
  }

  followProfile(name: string) {
    let autherizationHeader = this.getAuthHeader();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    let _url = this._getProfile + name + '/follow';
    return this._http.post<ProfileObj>(_url, {}, httpOptions);
  }

  unfollowUser(name: string) {
    let autherizationHeader = this.getAuthHeader();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    let _url = this._getProfile + name + '/follow';
    return this._http.delete<ProfileObj>(_url, httpOptions);
  }
  getAuthHeader(): string {
    const prefix: string = 'Token ';
    const token = localStorage.token;
    return prefix + token;
  }
}
