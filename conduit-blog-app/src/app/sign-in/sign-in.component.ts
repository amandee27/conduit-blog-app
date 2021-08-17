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
  isSubmit: boolean = false;
  errorKey: string = '';
  errorVal: string = '';
  isError: boolean = false;

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
        this.isError = false;
      },
      (error) => {
        this.isError = true;
        console.log('Failed', error.error.errors);
        // Object.keys(error.error.errors).forEach((value) => {
        //   this.errorKey = value;
        //   console.log(this.errorKey);
        // });
        // Object.values(error.error.errors).forEach((value) => {
        //   if (value !== undefined) {
        //     this.errorVal = String(value);
        //   }
        //   console.log(this.errorVal);
        // });

        Object.keys(error.error.errors).map((value) => {
          this.errorKey = value;
        });
        Object.values(error.error.errors).map((value) => {
          this.errorVal = String(value);
        });
      }
    );
  }

  Issubmit(isSubmit: boolean) {
    this.isSubmit = isSubmit;
  }

  close() {
    this.errorKey = '';
    this.errorVal = '';
  }
}
