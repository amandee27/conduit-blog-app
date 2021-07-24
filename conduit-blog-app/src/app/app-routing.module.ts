import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  // { path: './', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  {path: 'user', component:UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
