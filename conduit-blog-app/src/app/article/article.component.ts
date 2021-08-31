import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from '../model/article';
import { ArticleService } from '../article.service';
import { Comments, Comment } from '../model/comments';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
  comments?: Comment[];
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
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
  onSubmit() {
    this.activateRouter.paramMap.subscribe((params: ParamMap) => {
      let slug = params.get('slug');
      let comment: Comment = this.commentForm.value.comment;
      console.log(slug);
      if (slug !== null) {
        this.articleService.createComment(slug, comment).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
}
