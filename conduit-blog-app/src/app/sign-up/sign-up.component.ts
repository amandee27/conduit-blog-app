import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../model/userDetail';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { NewUser } from '../model/newUser';
import { UserDetailService } from '../user-detail.service';
import { userNameValidator } from '../validation.directive';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

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
  isSubmit: boolean = false;

  profileForm = this.formBuilder.group({
    username: [
      '',
      [Validators.required, userNameValidator(/^[A-Za-z0-9_]+$/g)],
    ],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private UserDetailService: UserDetailService,
    private route: Router
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
        this.UserDetailService.userLoginDetail(data);
        this.UserDetailService.isSignedInUser(true);
        this.profileForm.reset();
        this.route.navigate(['/profile']);
        this.isSubmit = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get profileFormControl() {
    return this.profileForm.controls;
  }
  Issubmit(isSubmit: boolean) {
    this.isSubmit = isSubmit;
  }
}
