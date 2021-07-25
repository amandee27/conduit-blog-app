import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UserDetail } from './model/userDetail';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  datalogin?: UserDetail;
  id: number = 0;
  signedIn: boolean = false;
  signedInData: any;
  constructor() {
    this.id = Math.floor(Math.random() * 10);
    console.log('This is server constructor', this.id);
  }

  private userDetailSource = new BehaviorSubject<UserDetail | null>(null);
  private isSignedInSource = new BehaviorSubject<boolean>(false);

  userDetail$ = this.userDetailSource.asObservable();
  isSignedIn$ = this.isSignedInSource.asObservable();

  userLoginDetail(detail: UserDetail) {
    this.datalogin = detail;
    this.userDetailSource.next(this.datalogin);
  }

  isSignedInUser(signed: boolean) {
    this.signedIn = signed;
    console.log(this.signedIn);
    this.isSignedInSource.next(this.signedIn);
  }
}
