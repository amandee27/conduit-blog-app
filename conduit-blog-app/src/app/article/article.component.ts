import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article?: Article;
  updatedTime: number = 0;
  constructor(
    private activateRouter: ActivatedRoute,
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe((params: ParamMap) => {
      let slug = params.get('slug');
      console.log(params.get('slug'));
      if (slug !== null) {
        this.userService.getArticle(slug).subscribe((data) => {
          console.log('This is article data***   :', data);
          this.article = data.article;
          console.log(this.article);
          console.log(this.article?.title);
        });
      }
    });
    var time = new Date();

    console.log(
      time.toLocaleString('en-LK', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        hour12: true,
        minute: '2-digit',
        second: '2-digit',
      })
    );
  }

  viewAuthor(author?: string) {
    this.route.navigate(['/author-profile', author]);
  }
}
