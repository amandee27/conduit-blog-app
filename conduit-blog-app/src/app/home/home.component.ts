import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { Article } from '../model/article';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

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
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.isSignedIn$.subscribe((data) => {
      this.isSignedIn = data;
    });
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data.articles;
    });
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
