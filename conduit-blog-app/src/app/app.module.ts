import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import {UserDetailService} from './user-detail.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, HomeComponent, SignUpComponent, UserComponent, NavBarComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule,FormsModule,HttpClientModule,NgbModule],
  providers: [UserDetailService],
  bootstrap: [AppComponent],
})
export class AppModule {}
