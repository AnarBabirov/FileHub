export class UserdtoLogin {
  id;
  token;

  constructor(user,token) {
    this.id = user._id;
    this.token =token;
  }
}
