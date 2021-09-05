import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserDetailService } from './user-detail.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidationDirective } from './validation.directive';
import { AuthorProfileComponent } from './author-profile/author-profile.component';
import { ArticleComponent } from './article/article.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { BasicArticleComponent } from './basic-article/basic-article.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CommentComponent } from './article/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SignUpComponent,
    UserComponent,
    NavBarComponent,
    FooterComponent,
    ValidationDirective,
    AuthorProfileComponent,
    ArticleComponent,
    NewArticleComponent,
    UpdateArticleComponent,
    BasicArticleComponent,
    UpdateUserComponent,
    CommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbAlertModule,
  ],
  providers: [UserDetailService],
  bootstrap: [AppComponent],
})
export class AppModule {}
