import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { UserDetailService } from '../user-detail.service';
import { NgForm } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user: User = { email: '', password: '' };
  isSubmitting: boolean = false;
  errors: string[] = [];

  constructor(
    private userService: UserService,
    private route: Router,
    private userDetailService: UserDetailService
  ) {}

  ngOnInit(): void {}

  submitForm(signInForm: NgForm) {
    this.isSubmitting = true;
    this.errors.splice(0, this.errors.length);
    this.userService.login(this.user).subscribe(
      (data) => {
        this.userDetailService.userLoginDetail(data);
        this.userDetailService.isSignedInUser(true);
        signInForm.resetForm();
        this.route.navigate(['/profile']);
        this.isSubmitting = false;
      },
      (error) => {
        Object.keys(error.error.errors).map((value) => {
          this.errors.push(value + ' ' + error.error.errors[value]);
        });
        this.isSubmitting = false;
      }
    );
  }

  close(index: number) {
    this.errors.splice(index, 1);
  }
}
