import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() homeArticles?: Article[];
  @Input() homeArticleTime?: number;
  @Input() isSignedIn: boolean = false;
  articleImage: string = '../../assets/articleCover1.jpg';

  constructor(private router: Router) {}

  ngOnInit(): void {}
  viewArticle(slug: string) {
    this.router.navigate(['./articles', slug]);
  }

  viewAuthor(author: string) {
    this.router.navigate(['/author-profile', author]);
  }
}
