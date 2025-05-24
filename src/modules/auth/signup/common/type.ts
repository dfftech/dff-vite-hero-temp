export type SignUpType = {
  email: string;
  name: string;
  pic: string;
  isEmailVerified?: boolean;
  provider?: string;
  type?: string;
  userid: string;
  password: string;
  reEnterPassword: string
};
