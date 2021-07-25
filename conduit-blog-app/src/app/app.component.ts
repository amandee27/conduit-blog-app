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
  title = 'conduit-blog-app';
  subscription?: Subscription;
  signedIn: boolean = false;

  constructor(
    private userDetailService: UserDetailService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    let token = localStorage.token;
    console.log(token);
    this.userService.getCurrentUser(token).subscribe((data) => {
      console.log('Current user data ', data);
      if (data.user) {
        this.signedIn = true;
        this.userDetailService.isSignedInUser(this.signedIn);
      }
    });
  }
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription?.unsubscribe();
  }
}
