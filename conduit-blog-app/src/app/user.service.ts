import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url:string='http://localhost:3000/api/users/login';
  _urlNew:string='http://localhost:3000/api/user';
  _token: string="Token ";
  constructor(private _http:HttpClient) { 
    
  }
  login(user:User){
    return this._http.post<any>(this._url, {"user":user});
  }

  getCurrentUser(token:string){
    let autherizationHeader=((this._token +token));
    //console.log(autherizationHeader);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': autherizationHeader
      })
    };
    console.log(httpOptions);
    console.log("@@@@@@@@@@@@@2",token);
    return this._http.get<any>(this._urlNew,httpOptions);
  }
}
