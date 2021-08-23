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
  newUser: NewUser = { username: '', email: '', password: '' };
  isSubmit: boolean = false;
  errors: string[] = [];
  isError: boolean = false;

  profileForm = this.formBuilder.group({
    username: ['', [Validators.required, userNameValidator(/^[A-Za-z0-9_]+$/)]],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private UserDetailService: UserDetailService,
    private route: Router
  ) {}

  ngOnInit(): void {}
  onSubmit() {
    this.newUser.username = this.profileForm.value.username;
    this.newUser.email = this.profileForm.value.email;
    this.newUser.password = this.profileForm.value.password;

    this.userService.signUp(this.newUser).subscribe(
      (data) => {
        this.UserDetailService.userLoginDetail(data);
        this.UserDetailService.isSignedInUser(true);
        this.profileForm.reset();
        this.route.navigate(['/profile']);
        this.isSubmit = false;
        this.isError = false;
      },
      (error) => {
        this.isError = true;
        console.log(error.error.errors);
        Object.keys(error.error.errors).map((value) => {
          let strError = value + ' ' + error.error.errors[value];
          console.log(value + ' ' + error.error.errors[value]);
          this.errors.push(strError);
        });
      }
    );
  }

  get profileFormControl() {
    return this.profileForm.controls;
  }
  Issubmit(isSubmit: boolean) {
    this.isSubmit = isSubmit;
    this.errors.splice(0, this.errors.length);
    this.isError = false;
  }

  closeAlert(index: number) {
    this.errors.splice(index, 1);
  }
}
