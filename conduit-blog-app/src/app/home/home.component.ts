import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { UserService } from '../user.service';
import { Article } from '../model/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription?: Subscription;
  isSignedIn: boolean = false;
  articles?: Article[];
  tagList?: string[];

  constructor(
    private userDetailService: UserDetailService,
    private userService: UserService,
    private router: Router
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

  viewArticle(slug: string) {
    this.router.navigate(['./articles', slug]);
  }

  viewAuthor(author: string) {
    this.router.navigate(['/author-profile', author]);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
