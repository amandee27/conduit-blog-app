import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../article.service';
import { Comments, Comment } from '../model/comments';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
  comments?: Comment[];
  constructor(
    private activateRouter: ActivatedRoute,
    private articleService: ArticleService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe((params: ParamMap) => {
      let slug = params.get('slug');
      if (slug !== null) {
        this.articleService.getArticle(slug).subscribe((data) => {
          this.article = data.article;
        });
        this.articleService.getComments(slug).subscribe((data) => {
          this.comments = data.comments;
        });
      }
    });
  }

  viewAuthor(author?: string) {
    this.route.navigate(['/author-profile', author]);
  }
}
