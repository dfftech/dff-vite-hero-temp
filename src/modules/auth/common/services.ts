import { signal } from "@preact/signals-react";

import { ForgotPasswordType, SignUpType } from "./types";

export const ForgotPasswordOtpType = signal<ForgotPasswordType>({} as ForgotPasswordType);

export const EnabledButtons = signal<boolean>(false);

export const ForgotSerice = async () => {
  // const res = await AppHttp.Post(
  //   AppHttp.AUTH_MS_HOST + "/auth/signUp",
  //   SignUpSignal.value
  // );
  // return res;
};


export const SignUpSignal = signal<SignUpType>({} as SignUpType);
export const signUpSerice = async () => {
  // const res = await AppHttp.Post(
  //   AppHttp.AUTH_MS_HOST + "/auth/signUp",
  //   SignUpSignal.value
  // );
  // return res;
};

export const verifySignUp = async (otp: number, id: string) => {
  try {
    // Use the parameters in the API call
    const response = await fetch('/api/verify-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp, id }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error verifying signup:', error);
    throw error;
  }
};
