export interface Article {
  author: Owner;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: [];
  title: string;
  updatedAt: string;
}

export interface Owner {
  bio: string;
  following: boolean;
  image: string;
  username: string;
}
