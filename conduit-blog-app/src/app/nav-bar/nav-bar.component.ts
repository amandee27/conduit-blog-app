import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  subscription?: Subscription;
  signedIn: boolean = false;
  constructor(
    private userDetailService: UserDetailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.isSignedIn$.subscribe((data) => {
      this.signedIn = data;
    });
  }
  logout(event: MouseEvent) {
    event.preventDefault();
    this.userDetailService.isSignedInUser(false);
    localStorage.removeItem('token');
    this.router.navigate(['./sign-in']);
  }
}
