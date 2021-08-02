import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { UserDetail } from '../model/userDetail';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  subscription?: Subscription;
  signedIn: boolean = false;
  userImage?: string;
  userName?: string;
  constructor(
    private userDetailService: UserDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.isSignedIn$.subscribe((data) => {
      this.signedIn = data;
    });
    this.subscription = this.userDetailService.userDetail$.subscribe((data) => {
      this.userImage = data?.user.image;
      this.userName = data?.user.username;
    });
  }
  logout(event: MouseEvent) {
    this.isMenuCollapsed = true;
    event.preventDefault();
    this.userDetailService.isSignedInUser(false);
    localStorage.removeItem('token');
    this.router.navigate(['./sign-in']);
  }
}
