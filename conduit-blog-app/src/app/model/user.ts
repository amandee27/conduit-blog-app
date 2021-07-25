export class User {
  constructor(public email: string, public password: string) {}
}

export interface User {
  email: string;
  password: string;
}
