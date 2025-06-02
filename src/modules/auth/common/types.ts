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

export type ForgotPasswordType = {
  email: string;
};

export type SignUpType = {
  email: string;
  name: string;
  pic: string;
  isEmailVerified?: boolean;
  provider?: string;
  type?: string;
  userid: string;
  password: string;
  reEnterPassword: string;
};
export type OtpType = {
  otp: string;
  email: string;
};


