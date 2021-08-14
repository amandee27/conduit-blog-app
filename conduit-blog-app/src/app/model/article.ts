export interface Articles {
  articles: Article[];
}

export interface ArticleObj {
  article: Article;
}

export interface Article {
  author: Owner;
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

export interface Author {
  profile: Owner;
}
export interface Owner {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}
