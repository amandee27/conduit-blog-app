export interface UserDetail {
  user: UserInfo;
}
export interface PersonInfo {
  username: string;
  bio?: string;
  image?: string;
}

export interface UserInfo extends PersonInfo {
  email: string;
  token: string;
}
