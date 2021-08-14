import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { NewArticle } from '../model/newArticle';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  formData = this.profileForm.value;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

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
    this.userService.createArticle(art.article).subscribe((data) => {
      console.log('This is response data', data);
      this.profileForm.reset();
    });
    console.log(art);
  }
}
