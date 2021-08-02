import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { UserDetail, UserInfo } from '../model/userDetail';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  subscription?: Subscription;
  user?: UserInfo;

  constructor(private userDetailService: UserDetailService) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.userDetail$.subscribe((data) => {
      if (data !== null) {
        let token = data.user.token;
        this.user = data.user;
        localStorage.setItem('token', token);
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
