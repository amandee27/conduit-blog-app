import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from '../model/article';
import { UserService } from '../user.service';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss'],
})
export class AuthorProfileComponent implements OnInit {
  author?: Profile;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  following: boolean = false;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let authorId = params.get('author');
      if (authorId !== null) {
        this.userService.getProfile(authorId).subscribe((data) => {
          this.author = data.profile;
        });
      }
    });
  }

  followUser() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let authorId = params.get('author');
      if (authorId !== null) {
        this.userService.followProfile(authorId).subscribe((data) => {
          this.following = data.profile.following;
        });
      }
    });
  }

  unfollowUser() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let authorId = params.get('author');
      if (authorId !== null) {
        this.userService.unfollowUser(authorId).subscribe((data) => {
          this.following = data.profile.following;
        });
      }
    });
  }
}
