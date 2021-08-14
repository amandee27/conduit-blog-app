import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles, ArticleObj } from './model/article';
import { NewArticle } from './model/newArticle';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  _createArticles: string = 'http://localhost:3000/api/articles';
  _getArticles: string = 'http://localhost:3000/api/articles';
  constructor(private _http: HttpClient) {}

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

  getAuthHeader(): string {
    const prefix: string = 'Token ';
    const token = localStorage.token;
    return prefix + token;
  }
}
