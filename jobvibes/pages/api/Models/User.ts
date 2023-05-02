import IUser from './IUser';

class User implements IUser {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export default User;
