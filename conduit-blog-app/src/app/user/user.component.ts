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
          const obj = JSON.parse(data);
          let token=obj.user.token;
          this.username=obj.user.username;
          this.email=obj.user.email;
          this.bio=obj.user.bio;
          this.image=obj.user.image;
          localStorage.setItem("token",JSON.stringify(token));
        }
        
      }
    );

    this.userDetailService.usertest();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
