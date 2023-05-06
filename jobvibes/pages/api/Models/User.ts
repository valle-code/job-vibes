import IUser from './IUser';

class User implements IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  userRole: number;
  adminRole: number;
  bannedRole: number;

  constructor(id: number, username: string, password: string, email: string, userRole: number,  adminRole: number, bannedRole: number) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.userRole = userRole;
    this.adminRole = adminRole;
    this.bannedRole = bannedRole;
  }
}

export default User;
