import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetailService } from '../user-detail.service';
import { UserDetail, UserInfo } from '../model/userDetail';
import { ArticleService } from '../article.service';
import { Article, Articles } from '../model/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  subscription?: Subscription;
  user?: UserInfo;
  articles?: Articles;

  constructor(
    private userDetailService: UserDetailService,
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDetailService.userDetail$.subscribe((data) => {
      if (data !== null) {
        let token = data.user.token;
        this.user = data.user;
        console.log(this.user);
        if (this.user) {
          console.log('user Article retriving');
          this.articleService
            .getUserArticles(this.user?.username)
            .subscribe((data) => {
              console.log(data);
              this.articles = data;
              console.log(this.articles.articles);
            });
        }
        localStorage.setItem('token', token);
      }
    });

    console.log(this.user);
  }

  viewArticle(slug: string) {
    this.router.navigate(['./articles', slug]);
  }

  viewAuthor(author: string) {
    this.router.navigate(['./author-profile', author]);
  }

  editArticle(slug: string) {
    this.router.navigate(['/profile/edit-article', slug]);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
