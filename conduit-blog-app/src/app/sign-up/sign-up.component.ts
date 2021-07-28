import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../model/userDetail';
import { User } from '../model/user';
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

  profileForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.profileForm.value);
    this.profileForm.reset();
  }
}
