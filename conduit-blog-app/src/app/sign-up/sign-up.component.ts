import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../model/userDetail';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { NewUser } from '../model/newUser';
import { UserDetailService } from '../user-detail.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // profileForm = new FormGroup({
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  newUser: NewUser = { username: '', email: '', password: '' };

  profileForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.profileForm.value);
    this.newUser.username = this.profileForm.value.username;
    this.newUser.email = this.profileForm.value.email;
    this.newUser.password = this.profileForm.value.password;
    this.userService.signUp(this.newUser).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.profileForm.reset();
  }
}
