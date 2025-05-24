export type GoogleUserResponseType = {
  email: string;
  name: string;
  pic: string;
  isEmailVerified?: boolean;
  provider: string;
  type: string;
  token: string;
};

export type UserSignIn = {
  userid: string;
  password: string;
  type: "user";
  provider: "signin";
};
