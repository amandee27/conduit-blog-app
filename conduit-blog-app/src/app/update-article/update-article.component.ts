import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit {
  article?: Article;
  profileForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    tagList: new FormControl(['']),
  });

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let slug = params.get('slug');
      if (slug !== null) {
        this.articleService.getArticle(slug).subscribe((data) => {
          console.log(data);
          if (data !== undefined) {
            this.article = data.article;
            console.log(this.article.title);
            this.profileForm.setValue({
              title: this.article.title,
              description: this.article.description,
              body: this.article.body,
              tagList: this.article.tagList,
            });
          }
        });
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.value.tagList);
    let tagList: string[] = [];
    if (this.profileForm.value.tagList !== this.article?.tagList) {
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
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let slug = params.get('slug');
      if (slug !== null) {
        this.articleService.updateArticle(art.article, slug).subscribe(
          (data) => {
            console.log(data);
            this.profileForm.reset();
            this.route.navigate(['./articles', slug]);
          },
          (error) => {
            console.log(error.errors.message);
          }
        );
      }
    });
  }
}
