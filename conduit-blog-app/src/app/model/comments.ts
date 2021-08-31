export interface Comments {
  comments: Comment[];
}

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: Author;
}

export interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
