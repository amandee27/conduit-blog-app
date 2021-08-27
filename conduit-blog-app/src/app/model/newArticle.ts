export interface NewArticleObj {
  article: NewArticle;
}
export interface NewArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
