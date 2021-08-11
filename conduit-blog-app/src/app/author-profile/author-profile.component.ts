import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Owner } from '../model/article';
import { UserService } from '../user.service';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss'],
})
export class AuthorProfileComponent implements OnInit {
  author?: Owner;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let token = localStorage.token;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let authorId = params.get('author');
      if (authorId !== null) {
        this.userService.getAuthor(authorId, token).subscribe((data) => {
          this.author = data.profile;
          console.log(data);
        });
      }
    });
  }
}
