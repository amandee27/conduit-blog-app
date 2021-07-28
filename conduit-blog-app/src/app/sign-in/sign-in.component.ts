import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { UserDetailService } from '../user-detail.service';
import { DataService } from '../data.service';
import { UserDetail } from '../model/userDetail';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user = new User('', '');
  logged: boolean = false;
  constructor(
    private userService: UserService,
    private route: Router,
    private userDetailService: UserDetailService
  ) {}

  ngOnInit(): void {}

  submitForm(signInForm: NgForm) {
    if (this.user.email !== '' && this.user.email !== '') {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    this.userService.login(this.user).subscribe(
      (data) => {
        console.log('This is signin submit form()', this.userDetailService.id);
        this.userDetailService.userLoginDetail(data);
        this.userDetailService.isSignedInUser(true);
        this.logged = true;
        this.route.navigate(['/profile']);
      },
      (error) => console.log('Failed', error)
    );

    signInForm.resetForm();
  }
}
