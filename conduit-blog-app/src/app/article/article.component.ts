import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
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
      }
    });
  }

  viewAuthor(author?: string) {
    this.route.navigate(['/author-profile', author]);
  }
}
