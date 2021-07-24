import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {UserDetailService} from '../user-detail.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  subscription?: Subscription;
  username:string='';
  email:string='';
  bio:string='';
  image:string='';

  constructor(private userDetailService:UserDetailService) {
    
   }

  ngOnInit(): void {
    console.log("user component ngOnInit",this.userDetailService.id);
    this.subscription=this.userDetailService.userDetail$.subscribe(
      (data)=>{
        console.log("here user data",data);
        
        if(data!==null){
          let token=data.user.token;
          this.username=data.user.username;
          this.email=data.user.email;
          this.bio=data.user.bio;
          this.image=data.user.image;
          localStorage.setItem("token",JSON.stringify(token));
        }
        
      }
    );

    
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
