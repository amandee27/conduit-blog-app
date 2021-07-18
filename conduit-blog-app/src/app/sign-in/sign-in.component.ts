
import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  user=new User('','');
  constructor(private userService:UserService) {}

  ngOnInit(): void {}
  
  submitForm() {
    if(this.user.email!=='' && this.user.email!==''){
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    console.log(JSON.stringify({user:this.user}));
     this.userService.login(this.user).subscribe(
       data=> console.log("Success",data),
       error => console.log('Failed',error)
     );
     
    this.user.email='';
    this.user.password='';
  }
}
