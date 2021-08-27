import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { NewArticle } from '../model/newArticle';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss'],
})
export class NewArticleComponent implements OnInit {
  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    tagList: new FormControl(['']),
  });
  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {}

  onSubmit() {
    let tagList: string[] = this.profileForm.value.tagList.split(',', -1);
    let art = {
      article: {
        title: this.profileForm.value.title,
        description: this.profileForm.value.description,
        body: this.profileForm.value.body,
        tagList: tagList,
      },
    };
    this.articleService.createArticle(art.article).subscribe(
      (data) => {
        this.profileForm.reset();
      },
      (error) => {
        console.log(error.errors.message);
      }
    );
  }
}
