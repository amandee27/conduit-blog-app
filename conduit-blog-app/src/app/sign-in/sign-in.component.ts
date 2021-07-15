import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor() {}

  ngOnInit(): void {}

  submitForm(userName: string, password: string) {
    this.username = userName;
    this.password = password;
    console.log(this.username);
    console.log(this.password);
    let user = {
      username: this.username,
      password: this.password,
    };
    localStorage.setItem('user', JSON.stringify(user));
  }
}
