export interface UserDetail {
  user: UserInfo;
}

export interface UserInfo {
  username: string;
  email: string;
  token: string;
  bio?: string;
  image?: string;
}
