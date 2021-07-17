import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, SignInComponent, HomeComponent, SignUpComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
