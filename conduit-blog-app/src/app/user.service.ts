import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url:string='http://localhost:3000/api/users/login';

  constructor(private _http:HttpClient) { 
    
  }
  login(user:User){
    return this._http.post<any>(this._url, {"user":user});
  }
}
