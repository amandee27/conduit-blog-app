import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url:string='http://localhost:3000/api/users/login';
  _urlNew:string='http://localhost:3000/api/user';

  constructor(private _http:HttpClient) { 
    
  }
  login(user:User){
    return this._http.post<any>(this._url, {"user":user});
  }

  getCurrentUser(token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this._http.get<any>(this._urlNew,httpOptions);
  }
}
