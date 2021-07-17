import { Component, OnInit } from '@angular/core';
import {User} from '../model/user'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user=new User('','');
  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    if(this.user.username!=='' && this.user.username!==''){
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    this.user.username='';
    this.user.password='';
    console.log(this.user);
  }
}
