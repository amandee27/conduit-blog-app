import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { ArticleComponent } from './article/article.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { BasicArticleComponent } from './basic-article/basic-article.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'profile', component: UserComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'author-profile/:author', component: AuthorProfileComponent },
  { path: 'articles/:slug', component: ArticleComponent },
  { path: 'profile/new-article', component: NewArticleComponent },
  { path: 'profile/edit-article/:slug', component: UpdateArticleComponent },
  { path: 'profile/basic-article', component: BasicArticleComponent },
  { path: 'profile/update-profile', component: UpdateUserComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
