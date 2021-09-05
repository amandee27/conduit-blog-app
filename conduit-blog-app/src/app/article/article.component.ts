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
  newComment?: Comment;
  slug: string | null = 'abc';
  loadedArticle: boolean = false;
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
      this.slug = params.get('slug');
      if (this.slug !== null) {
        this.articleService.getArticle(this.slug).subscribe((data) => {
          this.loadedArticle = true;
          this.article = data.article;
        });
      }
    });
  }

  viewAuthor(author?: string) {
    this.route.navigate(['/author-profile', author]);
  }
  // onSubmit() {
  //   this.activateRouter.paramMap.subscribe((params: ParamMap) => {
  //     let slug = params.get('slug');
  //     let comment: Comment = this.commentForm.value.comment;
  //     console.log(slug);
  //     if (slug !== null) {
  //       this.articleService.createComment(slug, comment).subscribe((data) => {
  //         console.log(data);
  //       });
  //     }
  //   });
  // }
}
