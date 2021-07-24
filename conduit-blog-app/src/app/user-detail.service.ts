import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  datalogin:string='';
  id:number=0;
  constructor() { 
    this.id=Math.floor(Math.random() * 10)
    console.log("This is server constructor",this.id);
  }

  private userDetailSource = new BehaviorSubject<string | null>(null);
  
  userDetail$ = this.userDetailSource.asObservable();
  userLoginDetail(detail: string) {
    this.datalogin=detail;
    console.log("this is user detail",detail);
    this.userDetailSource.next(detail);
  }

  usertest(){
    console.log("This is a test");
    return this.datalogin;
  }
}
