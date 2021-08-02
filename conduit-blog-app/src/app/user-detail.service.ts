import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { UserDetail } from './model/userDetail';
import { NewUser } from './model/newUser';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  datalogin?: UserDetail;
  signUpDetail?: NewUser;
  id: number = 0;
  signedIn: boolean = false;
  signedInData: any;
  constructor() {}

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
    this.isSignedInSource.next(this.signedIn);
  }
}
