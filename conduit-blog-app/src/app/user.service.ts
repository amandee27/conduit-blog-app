import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './model/user';
import { UserDetail } from './model/userDetail';
import { NewUser } from './model/newUser';
import { NewArticle } from './model/newArticle';
import { Articles, ArticleObj, Author } from './model/article';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _url: string = 'http://localhost:3000/api/users/login';
  _urlNew: string = 'http://localhost:3000/api/user';

  _signUpUrl: string = 'http://localhost:3000/api/users';
  _getArticles: string = 'http://localhost:3000/api/articles';
  _getAuthor: string = 'http://localhost:3000/api/profiles/';
  _createArticles: string = 'http://localhost:3000/api/articles';
  token: string = '';
  constructor(private _http: HttpClient) {}
  login(user: User) {
    return this._http.post<UserDetail>(this._url, { user: user });
  }

  getCurrentUser() {
    let autherizationHeader = this.getAuthHeader();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<UserDetail>(this._urlNew, httpOptions);
  }

  signUp(newUser: NewUser) {
    return this._http.post<UserDetail>(this._signUpUrl, { user: newUser });
  }

  getArticles() {
    let autherizationHeader = this.getAuthHeader();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<Articles>(this._getArticles, httpOptions);
  }

  getArticle(slug: string) {
    let autherizationHeader = this.getAuthHeader();
    let request = this._getArticles + '/' + slug;
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<ArticleObj>(request, httpOptions);
  }

  getAuthor(author: string) {
    let autherizationHeader = this.getAuthHeader();
    let url = this._getAuthor + author + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.get<Author>(url, httpOptions);
  }

  createArticle(createdArticle: NewArticle) {
    let newArticle = { article: createdArticle };
    //console.log('this is service :', newArticle);
    let autherizationHeader = this.getAuthHeader();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: autherizationHeader,
      }),
    };
    return this._http.post<ArticleObj>(
      this._createArticles,
      newArticle,
      httpOptions
    );
  }

  getAuthHeader(): string {
    const prefix: string = 'Token ';
    const token = localStorage.token;
    return prefix + token;
  }
}
