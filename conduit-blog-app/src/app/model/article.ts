import { PersonInfo } from './userDetail';

export interface Articles {
  articles: Article[];
}

export interface ArticleObj {
  article: Article;
}

export interface Article {
  author: Profile;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface ProfileObj {
  profile: Profile;
}
export interface Profile extends PersonInfo {
  following: boolean;
}
