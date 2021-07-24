
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../model/user';
import {UserService} from '../user.service';
import {UserDetailService} from '../user-detail.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  
})
export class SignInComponent implements OnInit {
  user=new User('','');
  userlogin:string='';
  logged:boolean=false;
  constructor(private userService:UserService,private route:Router, private userDetail:UserDetailService) {}

  ngOnInit(): void {}
  
  submitForm() {
    if(this.user.email!=='' && this.user.email!==''){
      localStorage.setItem('user', JSON.stringify(this.user));
    }
    console.log(JSON.stringify({user:this.user}));
     this.userService.login(this.user).subscribe(
       data=>{ 
          console.log("Success",data);
          this.userlogin=JSON.stringify(data);
          console.log("This is signin submit form()",this.userDetail.id);
          this.userDetail.userLoginDetail(this.userlogin);
          this.logged=true;
          this.route.navigate(['/user']);
      },
       error => console.log('Failed',error)
     );
     
    this.user.email='';
    this.user.password='';
  }
}
