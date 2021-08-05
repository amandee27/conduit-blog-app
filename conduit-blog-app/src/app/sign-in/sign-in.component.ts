import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { UserDetailService } from '../user-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user: User = { email: '', password: '' };
  isSubmit: boolean = false;

  constructor(
    private userService: UserService,
    private route: Router,
    private userDetailService: UserDetailService
  ) {}

  ngOnInit(): void {}

  submitForm(signInForm: NgForm) {
    this.userService.login(this.user).subscribe(
      (data) => {
        this.userDetailService.userLoginDetail(data);
        this.userDetailService.isSignedInUser(true);
        signInForm.resetForm();
        this.route.navigate(['/profile']);
        this.isSubmit = false;
      },
      (error) => console.log('Failed', error)
    );
  }

  Issubmit(isSubmit: boolean) {
    this.isSubmit = isSubmit;
  }
}
