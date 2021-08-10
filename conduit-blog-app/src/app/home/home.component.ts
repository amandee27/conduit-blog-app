import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { UserService } from '../user.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  isSignedIn: boolean = false;
  articles?: Article[];

  constructor(
    private userDetailService: UserDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let token = localStorage.token;
    this.subscription = this.userDetailService.isSignedIn$.subscribe((data) => {
      this.isSignedIn = data;
    });
    if (token !== undefined) {
      this.userService.getArticles(token).subscribe((data) => {
        console.log(data);
        this.articles = data.articles;
        console.log(this.articles?.length);
        console.log(this.articles?.[0].body);
      });
    }
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
