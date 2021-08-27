import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticleObj, Article } from '../model/article';
import { ArticleService } from '../article.service';
import { NewArticle, NewArticleObj } from '../model/newArticle';

@Component({
  selector: 'app-basic-article',
  templateUrl: './basic-article.component.html',
  styleUrls: ['./basic-article.component.scss'],
})
export class BasicArticleComponent implements OnInit {
  @Output() editFormData = new EventEmitter<NewArticleObj>();
  @Input() typeArticle: string | boolean = '';
  @Input() articleData?: NewArticle;

  profileForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    tagList: new FormControl(['']),
  });

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    console.log(this.typeArticle);
    console.log(this.articleData);
    if (this.typeArticle === 'Edit Article') {
      this.profileForm.setValue({
        title: this.articleData?.title,
        description: this.articleData?.description,
        body: this.articleData?.body,
        tagList: this.articleData?.tagList,
      });
    }
  }
  onSubmit() {
    console.log(this.profileForm.value.tagList);
    let tagList: string[] = [];
    if (this.profileForm.value.tagList !== this.articleData?.tagList) {
      tagList = this.profileForm.value.tagList.split(',', -1);
    } else {
      tagList = this.profileForm.value.tagList;
    }
    let art = {
      article: {
        title: this.profileForm.value.title,
        description: this.profileForm.value.description,
        body: this.profileForm.value.body,
        tagList: tagList,
      },
    };
    this.editFormData.emit(art);
    this.profileForm.reset();
  }
}
