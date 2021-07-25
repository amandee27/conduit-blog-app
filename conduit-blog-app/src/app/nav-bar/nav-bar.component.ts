import { Component, OnInit } from '@angular/core';
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
  constructor(private userDetailService: UserDetailService) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.isSignedIn$.subscribe((data) => {
      console.log('This is nav bar subscription data data', data);
    });
  }
  logout() {
    localStorage.removeItem('token');
  }
}
