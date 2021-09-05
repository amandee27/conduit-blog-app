import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewComment } from '../../model/newComment';
import { ArticleService } from '../../article.service';
import { Comment } from '../../model/comments';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });
  comments: Comment[] = [];
  @Input() articleSlug: string | null = '';
  @Output() addComment = new EventEmitter<Comment>();
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleSlug !== null) {
      this.articleService.getComments(this.articleSlug).subscribe((data) => {
        this.comments = data.comments;
        console.log(data);
      });
    }
  }

  onSubmit() {
    let comment: string = this.commentForm.value.comment;
    if (this.articleSlug !== null) {
      console.log(this.articleSlug);
      this.articleService.createComment(this.articleSlug, comment).subscribe(
        (data) => {
          if (data !== undefined) {
            let respondData: Comment = data;
            this.addComment.emit(respondData);
            console.log(respondData);
            window.location.reload();
            this.commentForm.reset();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
