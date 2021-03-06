import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from './user-detail.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  subscription?: Subscription;
  signedIn: boolean = false;

  constructor(
    private userDetailService: UserDetailService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    if (localStorage.token !== undefined) {
      this.userService.getCurrentUser().subscribe((data) => {
        if (data.user) {
          this.signedIn = true;
          this.userDetailService.isSignedInUser(this.signedIn);
          this.userDetailService.userLoginDetail(data);
        }
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
