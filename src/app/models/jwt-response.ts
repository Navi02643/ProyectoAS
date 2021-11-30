export interface JwtResponseI {
    dataUser: {
      id: number,
      username: string,
      useremail: string,
      userlastname: string;
      userphonenumber:string;
      useridrole: string;
      accessToken: string,
      expiresIn: string
    }
  }